"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";

import { BrandLockup } from "@/components/brand-lockup";
import type { DemoDefinition } from "@/data/demos";
import {
  bibleCompanionSamples,
  detectBibleCompanionMatches,
  fetchBiblePassage,
  liveListeningTranscript,
  type BiblePassageResult,
} from "@/lib/live-bible-companion";

type LiveBibleCompanionDemoProps = {
  demo: DemoDefinition;
};

type PassageLoadState =
  | {
      status: "loading";
    }
  | {
      status: "ready" | "fallback";
      passage: BiblePassageResult;
    };

const starterTranscript =
  "Paste conversation notes here. Try: John 3:16, Romans 8, David and Bathsheba, creation, or the woman at the well.";

function stopTimer(timer: MutableRefObject<number | null>) {
  if (timer.current !== null) {
    window.clearInterval(timer.current);
    timer.current = null;
  }
}

export function LiveBibleCompanionDemo({ demo }: LiveBibleCompanionDemoProps) {
  const [transcript, setTranscript] = useState(starterTranscript);
  const [isListening, setIsListening] = useState(false);
  const [passageStates, setPassageStates] = useState<Record<string, PassageLoadState>>({});
  const passageCache = useRef<Record<string, BiblePassageResult>>({});
  const streamTimer = useRef<number | null>(null);

  const matches = useMemo(() => detectBibleCompanionMatches(transcript), [transcript]);
  const matchKey = matches.map((match) => match.id).join("|");

  useEffect(() => {
    return () => stopTimer(streamTimer);
  }, []);

  useEffect(() => {
    if (matches.length === 0) {
      return;
    }

    const controller = new AbortController();

    matches.forEach((match) => {
      if (passageCache.current[match.id]) {
        return;
      }

      void fetchBiblePassage(match, { signal: controller.signal }).then((passage) => {
        if (controller.signal.aborted) {
          return;
        }

        passageCache.current[match.id] = passage;
        setPassageStates((current) => ({
          ...current,
          [match.id]: { status: passage.status, passage },
        }));
      });
    });

    return () => controller.abort();
  }, [matchKey, matches]);

  function applySample(sampleTranscript: string) {
    stopTimer(streamTimer);
    setIsListening(false);
    setTranscript(sampleTranscript);
  }

  function simulateLiveListening() {
    stopTimer(streamTimer);
    setTranscript("");
    setIsListening(true);

    let index = 0;

    streamTimer.current = window.setInterval(() => {
      setTranscript((current) => {
        const nextLine = liveListeningTranscript[index] ?? "";
        return current ? `${current}\n${nextLine}` : nextLine;
      });

      index += 1;

      if (index >= liveListeningTranscript.length) {
        stopTimer(streamTimer);
        setIsListening(false);
      }
    }, 760);
  }

  function clearTranscript() {
    stopTimer(streamTimer);
    setIsListening(false);
    setTranscript("");
  }

  return (
    <main className="shell inner-page">
      <section className="subpage-hero">
        <div className="identity-strip utility-strip">
          <BrandLockup note="Digital fix-it shop for local service businesses." />
          <nav className="route-nav" aria-label="Demo page links">
            <span className="route-nav-label">Route</span>
            <div className="route-nav-links">
              <Link href="/">Home</Link>
              <Link href="/demos">All demos</Link>
              <Link className="route-nav-cta" href="/#start">
                Start
              </Link>
            </div>
          </nav>
        </div>

        <div className="hero-ledger demo-hero-ledger live-companion-hero">
          <article className="hero-essay pay-essay">
            <p className="micro-note">Working demo for live conversation support.</p>
            <div className="hero-poster">
              <p className="headline-note">Scripture-aware transcript feed.</p>
              <div className="headline-stack">
                <span className="poster-mark">KW-COMPANION</span>
                <h1>{demo.title}</h1>
              </div>
              <div className="hero-orbit">
                <span>live transcript</span>
                <span>Bible API</span>
                <span>fallback ready</span>
              </div>
            </div>
            <p className="lede">{demo.problem}</p>
            <p className="hero-quick-note">{demo.solutionLine}</p>
            <div className="hero-actions">
              <a className="button primary" href="#live-bible-workbench">
                Try the companion
              </a>
              <Link className="button secondary" href="/demos">
                Back to demos
              </Link>
            </div>
          </article>

          <aside className="artifact-card signal-card pay-note-card">
            <p className="panel-label">Detects</p>
            <ul className="signal-bullets">
              <li>John 3:16, Romans 8, 2 Samuel 11, and Genesis 1:1-3</li>
              <li>David and Bathsheba, woman at the well, armor of God, and prodigal son</li>
              <li>Sermon on the Mount, creation, and Cain and Abel</li>
              <li>Graceful fallback text if the Bible API is unavailable</li>
            </ul>
          </aside>
        </div>
      </section>

      <section id="live-bible-workbench" className="section-tray demo-form-shell live-companion-shell">
        <div className="section-heading">
          <p className="section-label">Working demo</p>
          <h2>Conversation in, passages out</h2>
          <p>{demo.formIntro}</p>
        </div>

        <div className="live-companion-grid">
          <section className="live-companion-panel live-companion-transcript-panel" aria-labelledby="transcript-heading">
            <div className="live-companion-panel-heading">
              <div>
                <p className="panel-label">Transcript input</p>
                <h3 id="transcript-heading">Live conversation text</h3>
              </div>
              <span className="live-companion-count">{matches.length} detected</span>
            </div>

            <label className="demo-field live-companion-textarea">
              <span>Transcript</span>
              <textarea
                rows={12}
                value={transcript}
                onChange={(event) => setTranscript(event.target.value)}
                placeholder="Paste a conversation transcript or notes here..."
              />
            </label>

            <div className="live-companion-samples" aria-label="Sample transcripts">
              {bibleCompanionSamples.map((sample) => (
                <button key={sample.label} type="button" onClick={() => applySample(sample.transcript)}>
                  {sample.label}
                </button>
              ))}
            </div>

            <div className="live-companion-actions">
              <button className="button primary" type="button" onClick={simulateLiveListening} disabled={isListening}>
                {isListening ? "Simulating..." : "Simulate live listening"}
              </button>
              <button className="button tertiary" type="button" onClick={clearTranscript}>
                Clear transcript
              </button>
            </div>

            <p className="contact-note live-companion-note">
              Mic transcription can be added with Web Speech API, Whisper, or RealtimeSTT.
            </p>
          </section>

          <section className="live-companion-panel live-companion-feed-panel" aria-labelledby="feed-heading" aria-live="polite">
            <div className="live-companion-panel-heading">
              <div>
                <p className="panel-label">Companion feed</p>
                <h3 id="feed-heading">Detected passages</h3>
              </div>
              <span className="live-companion-status">{isListening ? "Listening" : "Ready"}</span>
            </div>

            {matches.length === 0 ? (
              <div className="live-companion-empty">
                <p className="panel-label">Waiting for a cue</p>
                <p>
                  Type or paste one of the supported references or topic phrases. Matching passages
                  will appear here.
                </p>
              </div>
            ) : (
              <div className="live-companion-feed-list">
                {matches.map((match) => {
                  const state = passageStates[match.id] ?? { status: "loading" };

                  return (
                    <article key={match.id} className={`live-passage-card live-passage-card-${state.status}`}>
                      <div className="live-passage-card-heading">
                        <div>
                          <p className="panel-label">{match.reason}</p>
                          <h4>{match.display}</h4>
                        </div>
                        <span>{state.status === "loading" ? "Fetching" : state.status}</span>
                      </div>

                      {state.status === "loading" ? (
                        <p className="live-passage-loading">Fetching passage from bible.helloao.org...</p>
                      ) : state.passage.status === "fallback" ? (
                        <div className="live-passage-fallback">
                          <p>{state.passage.fallbackMessage}</p>
                          <a href={state.passage.sourceUrl} target="_blank" rel="noreferrer">
                            Open API endpoint
                          </a>
                        </div>
                      ) : (
                        <div className="live-passage-verses">
                          {state.passage.verses.map((verse) => (
                            <p key={`${match.id}-${verse.number}`}>
                              <sup>{verse.number}</sup>
                              {verse.text}
                            </p>
                          ))}
                          <a href={state.passage.sourceUrl} target="_blank" rel="noreferrer">
                            Source: {state.passage.translation} via Hello AO
                          </a>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </section>

      <section className="section section-tray demo-detail-grid">
        <article className="demo-detail-card">
          <p className="section-label">What this fixes</p>
          <h2>What this fixes</h2>
          <ul className="messy-list">
            {demo.whatThisFixes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="demo-detail-card">
          <p className="section-label">Best for</p>
          <h2>Best for</h2>
          <ul className="messy-list">
            {demo.bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
