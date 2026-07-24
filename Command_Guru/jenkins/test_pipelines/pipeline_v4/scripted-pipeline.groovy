cat > /home/labex/project/scripted-pipeline.groovy <<'GROOVY'
node {
    def runTests = true

    try {
        stage('Prepare') {
            echo 'Preparing scripted pipeline'
            sh 'pwd'
        }

        stage('Build') {
            echo 'Building with scripted syntax'
            sh 'echo Compiling scripted pipeline demo'
        }

        if (runTests) {
            stage('Test') {
                echo 'Tests enabled by Groovy condition'
                sh 'echo Running scripted pipeline tests'
            }
        }
    } finally {
        echo 'Pipeline cleanup complete'
    }
}
GROOVY