installLocation='/usr/local/lib/flashbots-cli'

rm -rf ./flashbots-cli 2>/dev/null
sudo rm -rf $installLocation 2>/dev/null
git clone https://github.com/zeroXbrock/flashbots-cli.git
cd flashbots-cli
yarn install && yarn build
cd ..

sudo mv ./flashbots-cli $installLocation

aliasStmt="alias flashbots=\"${installLocation}/bin/run\""

if [ -f ~/.zshrc ]; then
   # assume Zsh
   echo $aliasStmt >> ~/.zshrc
   source ~/.zshrc
elif [ -f ~/.bashrc ]; then
   # assume Bash
   echo $aliasStmt >> ~/.bashrc
   source ~/.bashrc
else
   # assume something else
   echo "Couldn't find your terminal profile (.zshrc or .bashrc)."
   echo "Add the following line to your profile file:"
   echo
   echo $aliasStmt
fi

echo "All done. Run 'flashbots' to see a list of commands."
