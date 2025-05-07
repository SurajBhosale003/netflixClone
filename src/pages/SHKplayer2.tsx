/// <reference types="react" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mux-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        'stream-type'?: string;
        'metadata-video-title'?: string;
        'primary-color'?: string;
        autoplay?: boolean;
        muted?: boolean;
        playsinline?: boolean;
      };
    }
  }
}

import '@mux/mux-player';

function SHKplayer2() {
  return (
    <div style={{ maxWidth: '100%', padding: '1rem' }}>
      <mux-player
        src="https://storage.googleapis.com/1000gns/1001/content/videos/movies/Predator%20Badlands/PredatorBadlands-trans-audioOPT/master.m3u8"
        stream-type="on-demand"
        metadata-video-title="Little-princesss"
        primary-color="#2F8DC0"
        muted
        autoplay
        playsinline
        style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
      ></mux-player>
    </div>
  );
}

export default SHKplayer2;
