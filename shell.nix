{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "vuedoc";
  nativeBuildInputs = [
    pkgs.nodejs-12_x
  ];
  shellHook = ''
    mkdir -p .nix-node
    export NODE_PATH=$PWD/.nix-node
    export PATH=$NODE_PATH/bin:$PATH

    npm config set prefix $NODE_PATH
  '';
}
