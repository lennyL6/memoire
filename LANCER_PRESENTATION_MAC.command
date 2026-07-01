#!/bin/zsh
cd "$(dirname "$0")"
echo "============================================="
echo "  Fiducial FPSG - Soutenance interactive"
echo "============================================="

if ! command -v node >/dev/null 2>&1; then
  echo "ERREUR : Node.js n'est pas installé. Installe Node.js LTS puis relance ce fichier."
  read "?Appuie sur Entrée pour fermer..."
  exit 1
fi

if [ ! -d "node_modules" ]; then
  echo "Installation des dépendances - première ouverture uniquement..."
  npm install || { read "?Erreur npm install. Appuie sur Entrée pour fermer..."; exit 1; }
fi

echo "Lancement du serveur local..."
npm run dev &
SERVER_PID=$!
sleep 5
open "http://localhost:5173"
echo "Présentation ouverte : http://localhost:5173"
echo "Ne ferme pas cette fenêtre avant la fin de la soutenance."
wait $SERVER_PID
