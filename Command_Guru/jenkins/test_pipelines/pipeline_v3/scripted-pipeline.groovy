cat > /home/labex/project/scripted-pipeline.groovy <<'GROOVY'
node {
    stage('Prepare') {
        echo 'Preparing scripted pipeline'
        sh 'pwd'
    }

    stage('Build') {
        echo 'Building with scripted syntax'
        sh 'echo Compiling scripted pipeline demo'
    }
}
GROOVY


# nl -ba /home/labex/project/scripted-pipeline.groovy << this allow you to view the output with line numbers and blank lines included