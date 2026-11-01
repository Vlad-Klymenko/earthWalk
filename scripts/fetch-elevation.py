"""Fetch public NSW elevation pixels. Requires Pillow and NumPy to encode the JS grid."""
from pathlib import Path
import hashlib, json, urllib.request, urllib.parse
import numpy as np
from PIL import Image

root = Path(__file__).resolve().parent.parent
service = 'https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_5M_Elevation/ImageServer'
params = dict(bbox='151.2238,-33.9211,151.2376,-33.9139', bboxSR='4326', imageSR='4326', size='277,145', format='tiff', pixelType='F32', interpolation='RSP_BilinearInterpolation', f='image')
source_url = service + '/exportImage?' + urllib.parse.urlencode(params)
path = root / 'dist/data/unsw-elevation.tif'
if not path.exists():
    path.write_bytes(urllib.request.urlopen(source_url, timeout=90).read())
im = Image.open(path)
a = np.asarray(im)
assert a.shape == (145,277) and np.isfinite(a).all() and 0 < a.min() < a.max() < 150
scale = im.tag_v2[33550]
tie = im.tag_v2[33922]
data = dict(cols=im.width, rows=im.height, west=tie[3], north=tie[4], longitudeStep=scale[0], latitudeStep=scale[1], nominalSourceResolutionMetres=5, unit='metre', verticalReference='Orthometric ground elevation; NSW service', source=service, sourceUrl=source_url, attribution='NSW Spatial Services / DFSI 2019', sourceSha256=hashlib.sha256(path.read_bytes()).hexdigest(), minimum=round(float(a.min()),3), maximum=round(float(a.max()),3), values=[round(float(v),3) for v in a.flatten()])
(root/'dist/elevation-data.js').write_text('// Public NSW 5 m elevation service; GeoTIFF pixel centres, north-to-south rows.\nexport const ELEVATION = '+json.dumps(data,separators=(',',':'))+';\n')
print(json.dumps({k:v for k,v in data.items() if k != 'values'},indent=2))
