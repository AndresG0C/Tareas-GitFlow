pipeline {
    agent any
    
    tools {
        nodejs 'node-18'
    }
    
    environment {
        BACKEND_DIR = 'backend-node'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh '''
                        echo "📦 Node version:"
                        node --version
                        npm --version
                        
                        echo "📦 Installing all dependencies (including dev)..."
                        npm ci --include=dev || npm install --include=dev
                        
                        echo "📦 Verifying ts-jest installation:"
                        npm list ts-jest || npm install --save-dev ts-jest jest @types/jest supertest @types/supertest
                        
                        echo "📦 Installed packages:"
                        npm list --depth=0
                    '''
                }
            }
        }
        
        stage('Build TypeScript') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh '''
                        echo "🧪 Jest version:"
                        npx jest --version
                        
                        echo "🧪 Running tests..."
                        npm test
                    '''
                }
            }
        }
        
        stage('Success') {
            steps {
                echo '✅ Pipeline completado exitosamente!'
            }
        }
    }
    
    post {
        always {
            echo '🏁 Pipeline finalizado'
        }
        success {
            echo '✅ ✅ ✅ TODO OK ✅ ✅ ✅'
        }
        failure {
            echo '❌ ❌ ❌ PIPELINE FALLÓ ❌ ❌ ❌'
        }
    }
}