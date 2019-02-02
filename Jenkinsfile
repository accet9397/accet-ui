def config
    
node () {
    stage ('Source code checkout') {
	    // git credentialsId: 'StationSoftwareGithub', url: 'https://github.com/StationSoftware/apistation.git'
	    checkout scm
	    config = readYaml file: "JenkinsConfig.yaml"
	    // currentBuild.displayName = readMavenPom(file: WORKSPACE + '/pom.xml').getVersion().toString().split('-').first() + BUILD_DISPLAY_NAME
	    
	    // stash name: 'source',
	    // 	  includes: 'src/**, Dockerfile, pom.xml'
    }
}
/*
parallel 'Continuous Integration': {
    node ('docker-maven-slave') {
        stage ('Deployment build') {

            sh 'rm -rf *'
            unstash 'source'

	        getMyMaven().run pom: 'pom.xml', 
	        				goals: '-U clean install -Dbuild.number=currentBuild.displayName'
	    }
	    
		stage ('Publish JUnit reports') {
		
			junit allowEmptyResults: true, testResults: 'target/surefire-reports/TEST-*.xml'

		}
		
		stage ('Push to Artifactory & Archive') {
	    	echo 'Configure Artifactory push...'
	    // 	getMyMaven().deployer.deployArtifacts buildInfo
	    // 	server.publishBuildInfo buildInfo
	        
	        archiveArtifacts 'target/*.jar'
	        
	        stash name: 'build',
	        	includes: 'target/*.jar, Dockerfile, pom.xml'
	    }
    }
    
}, 'Static Code Analysis': {
    node ('docker-maven-slave') {
        stage ('Sonar build') {

            sh 'rm -rf *'
            unstash 'source'
        
	        getMyMaven().run pom: 'pom.xml', 
	        				goals: '-U clean org.jacoco:jacoco-maven-plugin:prepare-agent install -Dmaven.test.failure.ignore=true -Dbuild.number=currentBuild.displayName'
		}
		
		stage ('Publish Jacoco reports') {
		
			getMyMaven().run pom: 'pom.xml', 
	        			goals: 'org.jacoco:jacoco-maven-plugin:report'
	        			
	        publishHTML([allowMissing: true, alwaysLinkToLastBuild: false, keepAll: true, reportDir: 'target/site/jacoco/', reportFiles: 'index.html', reportName: 'Code Coverage', reportTitles: ''])
		
		}
		
		stage ('Sonar scan') {
	    // 	echo 'Configure Sonar build here...'
			withEnv(['SONAR_BUILD_PARAMS=-Dsonar.host.url=${SONAR_HOST_URL} -Dsonar.links.scm=${GIT_URL} -Dsonar.links.ci=${BUILD_URL} -Dsonar.projectVersion=' + currentBuild.displayName]) {
			    withCredentials([string(credentialsId: 'optum-sonar-key', variable: 'SONAR_AUTH_TOKEN')]) {
				    getMyMaven().run pom: 'pom.xml', 
									goals: '-B org.sonarsource.scanner.maven:sonar-maven-plugin:3.1.1:sonar ${SONAR_BUILD_PARAMS} -Dsonar.login=${SONAR_AUTH_TOKEN}'
				}
			}
	    }
	    
	    stage ('Fortify scan') {
	    	echo 'Configure Fortify scan here...'
	    }
    }
}

node ('docker-oc-slave') {
    stage ('Build and push docker image to DTR') {
    	
        sh 'rm -rf *'
        unstash 'build'
        
        mavenPom = readMavenPom(file: WORKSPACE + '/pom.xml')
        artifact = 'target/' + mavenPom.getArtifactId() + '-' + mavenPom.getVersion() + '.jar'
        
        withDockerRegistry([credentialsId: config.docker.credentialsId, 
        					url: 'https://' + config.docker.registry]) {
            def img = docker.build(config.docker.registry + '/' + 
            						config.docker.org + '/' + 
            						config.docker.image + ':' + 
            						config.docker.tag, '--build-arg JAR_FILE=' + artifact + ' .')
            img.push()
        }
    
    }
    
    env.DEV_ENV = getEnvironment(config.dev)
	if(DEV_ENV != "SKIP") {
	    deploy(config.cloud)
	    stage ('Smoke test on ${DEV_ENV} environment') {
	    	echo 'Configure smoke test on dev here...'    
	    }
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////
def getMyMaven() {

    rtMaven = Artifactory.newMavenBuild()
    // rtMaven.tool = MAVEN_NAME // Tool name from Jenkins configuration
    rtMaven.tool = 'Maven'
    // server = Artifactory.server '-1381075113@1458159651773'
    // buildInfo = Artifactory.newBuildInfo()
    // rtMaven.deployer releaseRepo: 'UHG-Releases', snapshotRepo: 'UHG-snapshots', server: server
    // rtMaven.resolver releaseRepo: 'libs-releases', snapshotRepo: 'libs-releases', server: server
    
    rtMaven.deployer.deployArtifacts = false // Disable artifacts deployment during Maven run
    
    return rtMaven

}

def getEnvironment(parm) {
    def environment
    switch (parm.deployment.strategy) {
        case "BYPASS":
            stage("${parm.phase} deployment - Bypassed  \u2713") {
                echo "Bypassing deployment as configured."
                environment = "SKIP"
            }
            break
        case "DEF-NO-APPR":
            stage("${parm.phase} deployment - Default to ${parm.deployment.default} \u2713") {
                echo "Default environment - " + parm.deployment.default
                environment = parm.deployment.default
            }
            break
        case "DEF-APPR":
            stage("${parm.phase} deployment approval \u2713\u2717") {
                input message:'Approve deployment to ' + parm.deployment.default + ' ?'
                environment = parm.deployment.default
            }
            break
        case "ASK":
            stage("${parm.phase} deployment approval \u2713\u2717") {
                environment = input(id: 'userInput', 
                                    message: 'Approve deployment to ?', 
                                    parameters: [choice(name: "${parm.phase} Environment", 
                                                        choices: parm.environments.join("\n"), 
                                                        description: "Select ${parm.phase} environment"
                                                       )
                                                ]
                                   )
            }
            break
        default:
            stage("${parm.phase} deployment - Bypassed  \u2717") {
                echo "Not able to recognize configuration. Bypassing deployment."
                environment = "SKIP"
            }
    }
    environment
}

def deploy(parm) {node ("docker-oc-slave") {stage("Deploy to ${DEV_ENV}") {
    echo "Deploying to " + DEV_ENV
    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: parm.credentialsId,
                                usernameVariable: 'OS_USER', passwordVariable: 'OS_PASS']]) {
        withEnv(['OS_DEV_HOST='+parm.host
                ,'OS_DEV_PROJECT='+parm.project
                ,'OS_DEV_DC='+parm.dc
                // ,'OC_USER='+'pshanmug'
                // ,'TAG='+'Dev'
                // ,'ROUTE_NAME='+'oas-app'
                ]) {
            sh """
            oc login --server=$OS_DEV_HOST -u ${OS_USER} -p ${OS_PASS} --insecure-skip-tls-verify=true
            oc project $OS_DEV_PROJECT

            if [ `oc get dc | grep $OS_DEV_DC | tail -1 | awk '{print \$1}'` == "$OS_DEV_DC" ]; then
                echo 'DEPLOY CONFIG ALREADY EXISTS - USING IT'
                oc delete rc \$(oc get rc | grep $OS_DEV_DC | awk '\$2 == 0 {print \$1}') || true
                oc deploy $OS_DEV_DC --latest -n $OS_DEV_PROJECT
            else
                echo 'DEPLOY CONFIG DOES NOT EXIST - CREATE MANUALLY AND RETRY'
            fi

            oc logout
            """
                // oc new-app docker.optum.com/$OC_USER/$OS_DEV_DC:$TAG --name=$OS_DEV_DC
                // oc create route edge $ROUTE_NAME --service=$OS_DEV_DC --hostname=$OS_DEV_HOST
        }
    }
}}}

def notify(status){ 
   emailext (
        to: "premkumar.shanmugam@optum.com",
        subject: "'${env.BUILD_TAG} - Status - ${status}!'",
        mimeType: 'text/html',
        attachLog: true, 
        body: """<style>
                body, table, td, th, p {
	                font-family:verdana,helvetica,sans serif;
	                font-size:11px;
	                color:black;
                }
		        td.bg1 { color:white; background-color:#595959; font-size:120% }
		        td.console { font-family:courier new, lucida console; }
		        </style>
		        <body>
		        	<table border=2 cellspacing=2 cellpadding=2 width="40%">
						<tr>
							<td align="left" width="30%">
								<img src="https://jenkins.optum.com/provisioning/static/d7f1766a/images/headshot.png" />
							</td>
							<td valign="center" width="70%">
								<b style="font-size: 170%;">Jenkins Build Results</b>
							</td>
						</tr>
						<tr>
							<td>JOB NAME:</td>
							<td><a href='${env.BUILD_URL}'>${env.JOB_NAME}${env.BUILD_DISPLAY_NAME}</a></td>
						</tr>
						<tr>
			                <td>BUILD STATUS:</td>
			                <td>${status}</td>
		                </tr>
		                <tr>
		                    <td>DATE/TIME:</td>
		                    <td>${env.BUILD_TIMESTAMP}</td>
		                </tr>
		            </table>
		        	<br />
		
		        <!-- console output -->
			        <table border=0 cellspacing=2 cellpadding=2 width="40%">
		                <tr>
		    				<td class="bg1"><b>CONSOLE OUTPUT</b></td>
		                </tr>
		                <tr>
							<td class="console" width="100%">Please find attached build log file.</td>
		                </tr>
		        	</table>
		        	<br />
				</body>"""
	)
}
*/