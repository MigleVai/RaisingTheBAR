pipeline {
  agent any
  stages {
    stage('Build client') {
      steps {
        sh 'cd RaisingTheBAR/RaisingTheBAR.React/client/ && npm install && npm run build'
      }
    }
    stage('Publish') {
      parallel {
        stage('Publish client') {
          steps {
            sh 'cd RaisingTheBAR/RaisingTheBAR.React/client/ && sudo \\cp -r build/ ../../../../../temp/'
            sh '../../scripts/publish.sh'
          }
        }
        stage('Publish API') {
          steps {
            sh 'cd RaisingTheBAR/RaisingTheBAR.BLL & dotnet publish RaisingTheBAR.BLL.csproj -c Release /p:PublishProfile="..\\..\\..\\..\\scripts\\Publish.pubxml"'
          }
        }
      }
    }
  }
}