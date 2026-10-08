/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain <img>, next/image does not apply */
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Share card for LinkedIn, WhatsApp, X, Slack and search results
export const alt = 'JobHunter AI by SuperMIA: find the role, practice the interview, land the offer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const logo = `data:image/png;base64,${(await readFile(join(process.cwd(), 'public', 'brand', 'logo.png'))).toString('base64')}`;
const poster = `data:image/jpeg;base64,${(await readFile(join(process.cwd(), 'public', 'video', 'jobhunter-ai-demo-poster.jpg'))).toString('base64')}`;

export default function Image() {

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a0f33 0%, #311e59 60%, #4b2e83 100%)', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 0 0 72px', width: 760 }}>
          <div style={{ display: 'flex', alignSelf: 'flex-start', alignItems: 'center', background: '#fff', borderRadius: 22, padding: '14px 22px' }}>
            <img src={logo} width={210} height={70} alt="" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 40, fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            <span>Find the role.</span>
            <span>Practice the interview.</span>
            <span style={{ color: '#f9c320' }}>Land the offer.</span>
          </div>
          <div style={{ display: 'flex', marginTop: 32, fontSize: 28, color: '#c4b3ea' }}>The AI job search assistant by SuperMIA</div>
        </div>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', padding: 10, background: '#0f0820', borderRadius: 44, transform: 'rotate(-4deg)', boxShadow: '0 40px 80px rgba(0,0,0,0.5)' }}>
            <img src={poster} width={270} height={480} alt="" style={{ borderRadius: 36 }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
