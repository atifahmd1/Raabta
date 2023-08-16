const createOfferSdpUsingWebRTC = async (setLocalStream) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  setLocalStream(stream); // Save the local stream for later use

  const peerConnection = new RTCPeerConnection();
  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  return peerConnection.localDescription;
};

const createAnswerSdpUsingWebRTC = async (setLocalStream, fetchRemoteOffer) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  setLocalStream(stream);

  const peerConnection = new RTCPeerConnection();
  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });

  peerConnection.ondatachannel = (event) => {
    // Handle data channel if needed
  };

  const remoteOffer = await fetchRemoteOffer(); // Fetch the offer SDP from Firebase or elsewhere
  await peerConnection.setRemoteDescription(remoteOffer);

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  return peerConnection.localDescription;
};

export {createOfferSdpUsingWebRTC, createAnswerSdpUsingWebRTC};
