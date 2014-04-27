import sys
import os

PyneLib = os.path.abspath("/home/scott/SilverFox/Scott/Applications/GitHub/Pyne/")

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