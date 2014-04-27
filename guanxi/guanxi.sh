#!/bin/bash

GUANXI_LD_LIBRARY_PATH=$(pwd)/libudev.so.0

paths=(
  "/lib/x86_64-linux-gnu/libudev.so.1" # Ubuntu, Xubuntu, Mint
  "/usr/lib64/libudev.so.1" # SUSE, Fedora
  "/usr/lib/libudev.so.1" # Arch, Fedora 32bit
  "/lib/i386-linux-gnu/libudev.so.1" # Ubuntu 32bit
)

for i in "${paths[@]}"
do
  if [ -f $i ]
  then
    ln -sf "$i" $GUANXI_LD_LIBRARY_PATH
    break
  fi
done

export LD_LIBRARY_PATH=$GUANXI_LD_LIBRARY_PATH:$LD_LIBRARY_PATH

exec -a "$0" "./guanxi" "$@"