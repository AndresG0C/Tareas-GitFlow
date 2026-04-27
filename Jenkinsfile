pipeline {
    agent any
    
    environment {
        BACKEND_DIR = 'backend-node'
    }
    
    stages {
        // 1. OBTENER CÓDIGO
        stage('Checkout') {
            steps {
                echo '📥 Descargando código...'
                checkout scm
            }
        }
        
        // 2. INSTALAR DEPENDENCIAS
        stage('Install Dependencies') {
            steps {
                echo '📦 Instalando dependencias...'
                dir("${BACKEND_DIR}") {
                    sh 'npm install'
                }
            }
        }
        
        // 3. COMPILAR TYPESCRIPT
        stage('Build TypeScript') {
            steps {
                echo '🔨 Compilando TypeScript...'
                dir("${BACKEND_DIR}") {
                    sh 'npm run build'
                }
            }
        }
        
        // 4. EJECUTAR TESTS
        stage('Run Tests') {
            steps {
                echo '🧪 Ejecutando tests...'
                dir("${BACKEND_DIR}") {
                    sh 'npm test'
                }
            }
        }
        
        // 5. CONSTRUIR IMÁGENES DOCKER
        stage('Build Docker Images') {
            steps {
                echo '🐳 Construyendo imágenes Docker...'
                sh "docker build -t task-backend:latest ./${BACKEND_DIR}"
                sh "docker build -t task-frontend:latest ./frontend"
            }
        }
        
        // 6. DESPLEGAR (solo en main)
        stage('Deploy') {
            when { branch 'main' }
            steps {
                echo '🚀 Desplegando aplicación...'
                sh 'docker-compose down || true'
                sh 'docker-compose up -d --build'
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