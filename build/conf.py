import sys
import os

## path to pyne library, available from https://github.com/the-real-trash80/Pyne
PyneLib = os.path.abspath('')

sys.path.insert(1,PyneLib)

try:
    from Cone.scale import Scale as conf
except ImportError:
    ImportError("Pyne Library Missing.")

class Configuration(conf):
    """
    Overrides the Scale library for local use: See Scale
    """
    pass