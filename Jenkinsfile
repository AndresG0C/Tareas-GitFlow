pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                dir('backend-node') {
                    sh '''
                        node --version
                        npm --version
                        npm install
                        npm install --save-dev ts-jest
                    '''
                }
            }
        }
        
        stage('Build') {
            steps {
                dir('backend-node') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('backend-node') {
                    sh 'npm test'
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline exitoso!'
        }
        failure {
            echo '❌ Pipeline falló'
        }
    }
}