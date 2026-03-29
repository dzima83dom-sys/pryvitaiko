'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Send, Phone, X } from 'lucide-react';
import { AppShell } from '@/components/ui/AppShell';
import { GlassCard } from '@/components/ui/GlassCard';
import GenerationCountdown from '@/components/GenerationCountdown';
export function ResultScreen({
  text,
  onBack,
  isLoading,
  handleCopy,
}: {
  text: string;
  onBack: () => void;
  isLoading: boolean;
  handleCopy: () => void;
}) {
  const paragraphs = text.split('\n\n');
  const [showShareFallback, setShowShareFallback] = useState(false);

  const shareTelegram = () => {
    const shareText = text?.trim();
    if (!shareText) return;

    const encodedText = encodeURIComponent(shareText);
    const appUrl = `tg://msg?text=${encodedText}`;
    const webUrl = `https://t.me/share/url?url=&text=${encodedText}`;

    const startedAt = Date.now();
    window.location.href = appUrl;

    setTimeout(() => {
      if (Date.now() - startedAt < 1800) {
        window.location.href = webUrl;
      }
    }, 1200);
  };

  const shareViber = () => {
    const shareText = text?.trim();
    if (!shareText) return;

    const encodedText = encodeURIComponent(shareText);
    const appUrl = `viber://forward?text=${encodedText}`;
    const webUrl = `https://invite.viber.com/?g2=AQ${encodedText}`;

    const startedAt = Date.now();
    window.location.href = appUrl;

    setTimeout(() => {
      if (Date.now() - startedAt < 1800) {
        window.location.href = webUrl;
      }
    }, 1200);
  };

  const handleShare = async () => {
    const shareText = text?.trim();
    if (!shareText) return;

    if (navigator.share && window.isSecureContext) {
      try {
        await navigator.share({
          text: shareText,
        });
        return;
      } catch {
        return;
      }
    }

    setShowShareFallback(true);
  };

  const handleCopyAndClose = async () => {
    await handleCopy();
    setShowShareFallback(false);
  };

  return (
    <AppShell>
      <div
        className="grid h-full min-h-0 px-4 pt-4"
        style={{
          gridTemplateRows: 'auto auto minmax(0, 1fr) auto',
          rowGap: '12px',
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        }}
      >
        <div className="shrink-0">
          <button
            type="button"
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '136px',
              height: '56px',
              padding: '0 16px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.34)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.14) 100%)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              boxShadow:
                '0 10px 24px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '15px',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '17px', lineHeight: 1 }}>←</span>
            <span style={{ lineHeight: 1 }}>Назад</span>
          </button>
        </div>

        <div className="shrink-0">
          <GlassCard
            className="px-4 py-3 text-center"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.22) 100%)',
              border: '1px solid rgba(255,255,255,0.22)',
              boxShadow:
                '0 10px 24px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <h2
              className="text-[18px] font-extrabold text-cream sm:text-[20px]"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.35)',
                letterSpacing: '0.2px',
              }}
            >
              {isLoading ? 'Готую привітання...' : 'Все готово, відправляй'}
            </h2>
          </GlassCard>
        </div>

        <GlassCard
          className="min-h-0 overflow-hidden rounded-[24px]"
          style={{
            position: 'relative',
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.24) 100%)',
            border: '1px solid rgba(255,255,255,0.22)',
            boxShadow:
              '0 18px 34px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 999px rgba(0,0,0,0.06)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {!isLoading && (
            <>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.30) 45%, rgba(0,0,0,0.38) 100%)',
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '14px',
                  borderRadius: '20px',
                  background: 'rgba(0,0,0,0.18)',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.20)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
            </>
          )}

          {isLoading ? (
            <div
  className="flex h-full items-center justify-center flex-col"
  style={{
    padding: '24px',
    position: 'relative',
    zIndex: 1,
    gap: '10px',
  }}
>
              <GenerationCountdown isVisible={isLoading} />
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '280px',
                  height: '260px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.2, 0.38, 0.2],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    position: 'absolute',
                    width: '210px',
                    height: '210px',
                    borderRadius: '999px',
                    background:
                      'radial-gradient(circle, rgba(196,115,255,0.34) 0%, rgba(255,196,214,0.14) 42%, rgba(255,255,255,0) 72%)',
                    filter: 'blur(12px)',
                  }}
                />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    position: 'absolute',
                    width: '154px',
                    height: '154px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow:
                      'inset 0 0 24px rgba(255,255,255,0.04), 0 0 18px rgba(196,115,255,0.16)',
                  }}
                >
                  <motion.div
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '12px',
                      height: '12px',
                      borderRadius: '999px',
                      background: 'rgba(255,255,255,0.92)',
                      boxShadow: '0 0 12px rgba(255,255,255,0.6)',
                    }}
                  />
                </motion.div>

                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.9, 1, 0.9],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    width: '86px',
                    height: '86px',
                    borderRadius: '999px',
                    background:
                      'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.95) 0%, rgba(255,226,244,0.92) 22%, rgba(219,138,255,0.88) 52%, rgba(123,72,235,0.8) 100%)',
                    boxShadow:
                      '0 0 34px rgba(200,120,255,0.42), inset 0 2px 12px rgba(255,255,255,0.4)',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '18px',
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {[0, 1, 2].map((dot) => (
                    <motion.div
                      key={dot}
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.35, 1, 0.35],
                        scale: [0.9, 1.08, 0.9],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: dot * 0.18,
                        ease: 'easeInOut',
                      }}
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '999px',
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(236,184,255,0.95))',
                        boxShadow: '0 0 12px rgba(219,138,255,0.5)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <motion.div
  initial={{ opacity: 0, scale: 0.96, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.5, ease: 'easeOut' }}
  className="scrollbar-soft h-full min-h-0 overflow-y-auto"
              style={{
                WebkitOverflowScrolling: 'touch',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                className="text-cream sm:text-[20px]"
                style={{
                  padding: '24px 24px 28px',
                  wordBreak: 'break-word',
                  fontSize: '19px',
                  lineHeight: 1.9,
                  fontWeight: 600,
                  textShadow:
                    '0 1px 2px rgba(0,0,0,0.55), 0 6px 18px rgba(0,0,0,0.35)',
                  letterSpacing: '0.1px',
                }}
              >
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    style={{
                      margin: 0,
                      marginBottom: index === paragraphs.length - 1 ? 0 : '22px',
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </GlassCard>

        <div
          className="shrink-0"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '12px',
          }}
        >
          <button
            type="button"
            onClick={handleShare}
            disabled={isLoading}
            style={{
              minWidth: 0,
              height: '88px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.26)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.10) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow:
                '0 8px 20px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#fff',
              fontWeight: 700,
              textAlign: 'center',
              padding: '10px 8px',
              opacity: isLoading ? 0.55 : 1,
              pointerEvents: isLoading ? 'none' : 'auto',
            }}
          >
            <Share2 size={30} color="white" strokeWidth={2.2} />
            <span
              style={{
                fontSize: '14px',
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                textShadow: '0 2px 8px rgba(0,0,0,0.28)',
              }}
            >
              Відправити
            </span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            disabled={isLoading}
            style={{
              minWidth: 0,
              height: '88px',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.26)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.10) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow:
                '0 8px 20px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#fff',
              fontWeight: 700,
              textAlign: 'center',
              padding: '10px 8px',
              opacity: isLoading ? 0.55 : 1,
              pointerEvents: isLoading ? 'none' : 'auto',
            }}
          >
            <Copy size={30} color="white" strokeWidth={2.2} />
            <span
              style={{
                fontSize: '14px',
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                textShadow: '0 2px 8px rgba(0,0,0,0.28)',
              }}
            >
              Скопіювати
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showShareFallback && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareFallback(false)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.42)',
                zIndex: 50,
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.22 }}
              style={{
                position: 'absolute',
                left: '16px',
                right: '16px',
                bottom: 'max(16px, env(safe-area-inset-bottom))',
                zIndex: 60,
                borderRadius: '26px',
                border: '1px solid rgba(255,255,255,0.22)',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.10) 100%)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                boxShadow:
                  '0 20px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.14)',
                padding: '18px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                }}
              >
                <div
                  style={{
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: 800,
                    textShadow: '0 2px 10px rgba(0,0,0,0.28)',
                  }}
                >
                  Обери месенджер
                </div>

                <button
                  type="button"
                  onClick={() => setShowShareFallback(false)}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(255,255,255,0.10)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: '10px',
                }}
              >
                <button
                  type="button"
                  onClick={shareTelegram}
                  style={{
                    minWidth: 0,
                    height: '88px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.22)',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: '#fff',
                    fontWeight: 700,
                    padding: '10px 6px',
                  }}
                >
                  <Send size={28} color="white" />
                  <span style={{ fontSize: '13px' }}>Telegram</span>
                </button>

                <button
                  type="button"
                  onClick={shareViber}
                  style={{
                    minWidth: 0,
                    height: '88px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.22)',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: '#fff',
                    fontWeight: 700,
                    padding: '10px 6px',
                  }}
                >
                  <Phone size={28} color="white" />
                  <span style={{ fontSize: '13px' }}>Viber</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyAndClose}
                  style={{
                    minWidth: 0,
                    height: '88px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.22)',
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: '#fff',
                    fontWeight: 700,
                    padding: '10px 6px',
                  }}
                >
                  <Copy size={28} color="white" />
                  <span style={{ fontSize: '13px' }}>Скопіювати</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AppShell>
  );
}