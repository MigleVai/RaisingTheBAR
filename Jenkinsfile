pipeline {
  agent any
  stages {
    stage('Build client') {
      steps {
        sh '''#!/bin/bash -xe
cd RaisingTheBAR/RaisingTheBAR.React/client/ && npm install && npm run build'''
      }
    }
    stage('Publish') {
      parallel {
        stage('Publish client') {
          steps {
            sh '''#!/bin/bash -xe
cd RaisingTheBAR/RaisingTheBAR.React/client/ && sudo \\cp -r build/ ../../../../../temp/'''
            sh '''#!/bin/bash -xe
../../scripts/publish.sh'''
          }
        }
        stage('Publish API') {
          steps {
            sh '''#!/bin/bash -xe
cd RaisingTheBAR/RaisingTheBAR.BLL && sudo cp -r ../../../../scripts/dotnet/* .'''
            sh '''#!/bin/bash -xe
cd RaisingTheBAR/RaisingTheBAR.BLL && dotnet publish RaisingTheBAR.BLL.csproj -c Release /p:PublishProfile=Publish'''
          }
        }
      }
    }
  }
}