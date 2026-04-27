pipeline {
    agent any
    
    tools {
        nodejs 'node-18'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install & Build') {
            steps {
                dir('backend-node') {
                    bat '''
                        npm install
                        npm run build
                        npm test
                    '''
                }
            }
        }
        
        stage('Success') {
            steps {
                echo '✅ Pipeline exitoso!'
            }
        }
    }
    
    post {
        failure {
            echo '❌ Pipeline falló'
        }
    }
}