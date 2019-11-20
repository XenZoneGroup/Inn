#/usr/bin/bash

# Download gcloud CLI
CLOUD_SDK_REPO="cloud-sdk-$(grep VERSION_CODENAME /etc/os-release | cut -d '=' -f 2)"
echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo apt-get update && sudo apt-get install google-cloud-sdk

# Authenticate as service user
gcloud auth activate-service-account \
"xzg-support-gcr-ci-push@xzg-support-gcr.iam.gserviceaccount.com" \
--key-file="$AGENT_TEMPDIRECTORY/gcp-service-user.json"

# Install kustomize...
echo "installing kustomize"
opsys=linux
curl -s https://api.github.com/repos/kubernetes-sigs/kustomize/releases > curl.txt && \
  grep browser_download -m5 curl.txt |\
  grep $opsys -m1 |\
  cut -d '"' -f 4 |\
  xargs curl -O -L
mv kustomize_*_${opsys}_amd64 kustomize
chmod u+x kustomize
sudo mv ./kustomize /usr/bin/kustomize
rm curl.txt

# Install sops
curl -L -O https://github.com/mozilla/sops/releases/download/3.3.1/sops-3.3.1.linux
chmod u+x ./sops-3.3.1.linux
sudo mv ./sops-3.3.1.linux /usr/bin/sops
