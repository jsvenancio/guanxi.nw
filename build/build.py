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
from conf import Configuration

class Build():

    def __init__(self):
        self = self
        self.build()
    #end

    def get_configuration(self, file = 'guanxi.build.conf.yml', guanxiConf = 'guanxi_configuration'):
        conf = Configuration(file)
        conf.set_conf(conf.get_configuration(guanxiConf))
        return conf
    #end

    def build(self):
        conf = self.get_configuration()
        name = conf.get('guanxi.name')
        root = conf.get('guanxi.base.directory.root')
        guanxiDir = os.path.join(root, conf.get('guanxi.guanxi.directory.root'))

        ## guanxi binaries
        execFolder = conf.get('guanxi.nodeWebkit.binary') + '-%s-' + conf.get('guanxi.base.os')
        execDir = os.path.join(guanxiDir, conf.get('guanxi.guanxi.directory.exec'))

        ## node-webkit
        nwBitsList = conf.get('guanxi.nodeWebkit.bit')
        nwVersionList = conf.get('guanxi.nodeWebkit.version')
        nwFolder = conf.get('guanxi.nodeWebkit.name') + '-%s-' + conf.get('guanxi.base.os') + '-%s'
        nwDir = os.path.join(root, conf.get('guanxi.nodeWebkit.name'), conf.get('guanxi.nodeWebkit.directory'), nwFolder)
        nwBin = conf.get('guanxi.nodeWebkit.binary')

        ## guanxi source
        sourceDir = os.path.join(root, guanxiDir, conf.get('guanxi.guanxi.directory.source'))

        ## guanxi final
        distribution = conf.get('guanxi.name') + conf.get('guanxi.base.ext')
        distributionAbsPath = os.path.join(execDir, distribution)

        # zip source for nw independent file
        self.zip_src(sourceDir, execDir, distribution)

        ## create versions
        for nwVersion in nwVersionList:
            gBinDir = os.path.join(execDir, execFolder % nwVersion)
            gBin = os.path.join(gBinDir, 'guanxi')
            print('Build: ')
            print(gBinDir)
            for nwBit in nwBitsList:
                binHome = nwDir % (nwVersion, nwBit)
                nwBinLoc = os.path.join(binHome, nwBin)
                print(nwBinLoc)
                print('Concatenate: ')
                self.concatenate(nwBinLoc, distributionAbsPath, gBinDir, gBin)
                pakFile = os.path.join(binHome, conf.get('guanxi.nodeWebkit.pak'))
                pakName = conf.get('guanxi.nodeWebkit.pak')
                shellFile = os.path.join(guanxiDir, conf.get('guanxi.guanxi.directory.shell'), conf.get('guanxi.guanxi.file.shell'))
                shellName = conf.get('guanxi.guanxi.file.shell')
                print('Final zip: ')
                self.zip_bin(name, nwBit, gBin, pakFile, pakName, shellFile, shellName)
    #end

    def zip_src(self, sourceDir, buildDir, distribution):
        abs_src = os.path.abspath(sourceDir)
        binFile = os.path.join(buildDir, distribution)

        with zipfile.ZipFile(binFile, 'w', zipfile.ZIP_DEFLATED) as zf:
            for root, subdirs, files in os.walk(sourceDir):
                for fileName in files:
                    absname = os.path.abspath(os.path.join(root, fileName))
                    arcname = os.path.join(os.path.relpath(root, abs_src), fileName)
                    zf.write(absname, arcname)
    #end

    def concatenate(self, bin, app, binDir, binFile):
        ## if the directories don't exist, make them
        try:
            os.makedirs(binDir)
        except:
            pass

        ## create the executable file
        with open(binFile, 'wb') as destination:
            shutil.copyfileobj(open(bin,'rb'), destination)
            shutil.copyfileobj(open(app,'rb'), destination)

        ## make the binary executable
        st = os.stat(binFile)
        os.chmod(binFile, st.st_mode | stat.S_IXUSR | stat.S_IXGRP | stat.S_IXOTH)
    #end

    def zip_bin(self, name, nwbit, gBin, pakFile, pakName,  shellFile, shellName):
        ## create the zip file
        with zipfile.ZipFile(gBin + '-' +nwbit + '.zip', 'w', zipfile.ZIP_DEFLATED) as zf:
            ## add created binary
            zf.write(gBin, name)


            ## add pak
            zf.write(pakFile, pakName)

            ## add shell script
            zf.write(shellFile, shellName)

        ## remove the binary now that it's zipped up
        os.remove(gBin)
    #end


if __name__ == '__main__':
    Build()
#end
