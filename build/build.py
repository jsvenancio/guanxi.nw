#!/usr/bin/python3
__version__     = '0.2.1'
__vdate__       = '2012.05.11-00'
__author__      = 'Scott Rogers'
__stability__   = 'alpha'
__copying__     = """
===============================================================================
    Copyright (C) 2011 W. Scott Rogers
    This program is free software.
    You can redistribute it and/or modify it under the terms of the
    GNU General Public License as published by the Free Software Foundation;
    version 2 of the License.
===============================================================================
"""

import os
import sys
import stat
import shutil
import zipfile
import subprocess
# import Configuration

class Build():

    def __init__(self):
        self = self
        self.nwDir = "/home/scott/Media/Documents/node-webkit/Binaries/node-webkit-v0.9.2-linux-x64"
        self.nwBinFile = "nw"
        self.pakFile = "nw.pak"
        self.shellDir = "/home/scott/Media/Documents/guanxi.nw/guanxi"
        self.shellFile = "guanxi.sh"
        self.sourceDir = "/home/scott/Media/Documents/guanxi.nw/src"
        self.bldDir = "/home/scott/Media/Documents/guanxi.nw/bin"
        self.dst = "testg.nw"
        self.build()
    #end

    def getConfiguration(self, file = None, whichConfig = None):
        pass
    #end

    def build(self):

        self.zip_src()

        self.concatenate('x64', os.path.join(self.nwDir, self.nwBinFile), os.path.join(self.bldDir, self.dst), self.bldDir)

        self.zip_bin()
    #end

    def zip_bin(self):
        binFile = 'guanxi'
        with zipfile.ZipFile(os.path.join(self.bldDir, binFile + ".zip"), "w", zipfile.ZIP_DEFLATED) as zf:
            ## add created binary
            binAbsname = os.path.abspath(os.path.join(self.bldDir, binFile))
            print(binAbsname)
            zf.write(binAbsname, binFile)

            ## add pak
            pakAbsname = os.path.abspath(os.path.join(self.nwDir, self.pakFile))
            print(pakAbsname)
            zf.write(pakAbsname, self.pakFile)

            ## add shell script
            shAbsname = os.path.abspath(os.path.join(self.shellDir, self.shellFile))
            print(shAbsname)
            zf.write(shAbsname, self.shellFile)

    #end

    def concatenate(self, bit, bin, app, binDir):
        binFile = os.path.join(binDir, 'guanxi')
        with open(binFile, 'wb') as destination:
            shutil.copyfileobj(open(bin,'rb'), destination)
            shutil.copyfileobj(open(app,'rb'), destination)

        st = os.stat(binFile)
        os.chmod(binFile, st.st_mode | stat.S_IXUSR | stat.S_IXGRP | stat.S_IXOTH)
    #end

    def zip_src(self):
        abs_src = os.path.abspath(self.sourceDir)
        binFile = os.path.join(self.bldDir, self.dst)

        with zipfile.ZipFile(binFile, "w", zipfile.ZIP_DEFLATED) as zf:
            for root, subdirs, files in os.walk(self.sourceDir):
                for fileName in files:
                    absname = os.path.abspath(os.path.join(root, fileName))
                    arcname = os.path.join(os.path.relpath(root, abs_src), fileName)
                    # print(abs_src)
                    # print(arcname)
                    zf.write(absname, arcname)
    #end


if __name__ == '__main__':
    Build()
#end
