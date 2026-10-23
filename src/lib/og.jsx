/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain <img>, next/image does not apply */
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/*
 * Branded 1200×630 share card for inner pages and posts: kicker, page title, a short line and the logo.
 */

export const OG_SIZE = { width: 1200, height: 630 };

const logo = `data:image/png;base64,${(await readFile(join(process.cwd(), 'public', 'brand', 'logo.png'))).toString('base64')}`;

export function ogCard({ kicker, title, line }) {
  const size = title.length > 70 ? 54 : title.length > 48 ? 62 : 72;
  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: '64px 72px', background: 'linear-gradient(135deg, #1a0f33 0%, #311e59 58%, #4b2e83 100%)', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 20, padding: '12px 20px' }}>
            <img src={logo} width={180} height={60} alt="" />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', borderRadius: 999, border: '2px solid rgba(249,195,32,0.6)', color: '#fcd34d', fontSize: 24, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
            {kicker}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: size, fontWeight: 800, lineHeight: 1.06, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
          {line && <div style={{ display: 'flex', marginTop: 26, fontSize: 28, color: '#c4b3ea', maxWidth: 960 }}>{line}</div>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 24, color: '#ded5f5' }}>
          <div style={{ display: 'flex' }}>jobhunter.supermia.ai</div>
          <div style={{ display: 'flex', height: 8, width: 220, borderRadius: 8, background: 'linear-gradient(90deg, #9b7fd4, #f9c320)' }} />
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
