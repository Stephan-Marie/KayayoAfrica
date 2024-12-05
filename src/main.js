import { bootstrapCameraKit, createMediaStreamSource, Transform2D, } from '@snap/camera-kit';

(async function () {
  const cameraKit = await bootstrapCameraKit({ 
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzMzMzIxODYxLCJzdWIiOiI5YmE2NDk5Ni01MmEzLTRhN2QtODMyZC1mOTdkMWZhMGExM2F-U1RBR0lOR35hOWQ3YmFmMi01MmRkLTRkZWQtYjY1My05NmI1NTI4MjAzNzQifQ.QFKoi3cNpSVfDzTK4zDeYK_yfdusqTh9TjBNG4vkyy4' });

const session = await cameraKit.createSession();

document.getElementById('canvas').replaceWith(session.output.capture);

const lens = await cameraKit.lensRepository.loadLens(
    'd1683f1b-a3a8-4a7e-991b-620b54b33057',
    'ea36f243-fa3d-4f55-bc5e-60c799adcaca'
  );

const mediaStream = await navigator.mediaDevices.getUserMedia({
  video:{
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 576, ideal: 720, max: 1080 },
    facingMode: { exact: 'user' },
  },
});


const source = createMediaStreamSource(mediaStream, { 
  cameraType: 'user',
  transform: Transform2D.MirrorX,
})

await session.setSource(source);


//source.setRenderSize(window.innerWidth, window.innerHeight)

session.play('capture');

await session.applyLens(lens);


})();