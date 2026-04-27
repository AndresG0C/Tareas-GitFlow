pipeline {
    agent any
    
    // ✅ IMPORTANTE: Configurar NodeJS
    tools {
        nodejs 'node-18'  // Usa el nombre que pusiste en Jenkins
    }
    
    environment {
        BACKEND_DIR = 'backend-node'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Descargando código...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 Instalando dependencias...'
                dir("${BACKEND_DIR}") {
                    sh 'npm install'
                }
            }
        }
        
        stage('Build TypeScript') {
            steps {
                echo '🔨 Compilando TypeScript...'
                dir("${BACKEND_DIR}") {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                echo '🧪 Ejecutando tests...'
                dir("${BACKEND_DIR}") {
                    sh 'npm test'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo '🐳 Construyendo imágenes Docker...'
                sh "docker build -t task-backend:latest ./${BACKEND_DIR}"
                sh "docker build -t task-frontend:latest ./frontend"
            }
        }
    }
    
    post {
        success {
            echo '✅ ✅ ✅ PIPELINE EXITOSO ✅ ✅ ✅'
        }
        failure {
            echo '❌ ❌ ❌ PIPELINE FALLÓ ❌ ❌ ❌'
        }
        always {
            echo '🏁 Pipeline finalizado'
            sh 'docker system prune -f || true'
        }
    }
}