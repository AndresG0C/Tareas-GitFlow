pipeline {
    agent any
    
    tools {
        nodejs 'node-18'
    }
    
    environment {
        // Limpiar variable de OpenSSL que causa conflicto
        OPENSSL_CONF = ''
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
                        set OPENSSL_CONF=
                        echo "OpenSSL_CONF is now empty"
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