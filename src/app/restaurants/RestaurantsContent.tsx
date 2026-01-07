'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuroraBackground, NumberCounter } from '@/components/animations';
import { IPhoneMockup, MessageBubble, Delivered } from '@/components/pdf';

type QuizStep = 1 | 2 | 3 | 4 | 5 | 'result';

interface Answers {
  q1?: 'yes' | 'no';
  q2?: 'yes' | 'no';
  q3?: 'yes' | 'no';
  q4?: 'nothing' | 'emails' | 'sms';
  q5?: 'reviews' | 'slow-days' | 'reactivation' | 'learn-more';
}

export default function RestaurantsContent() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [step, setStep] = useState<QuizStep>(1);
  const [answers, setAnswers] = useState<Answers>({});

  const openQuiz = () => {
    setShowQuiz(true);
    setStep(1);
    setAnswers({});
  };

  const closeQuiz = () => {
    setShowQuiz(false);
  };

  const handleAnswer = (question: keyof Answers, value: string) => {
    setAnswers(prev => ({ ...prev, [question]: value }));

    // Advance to next step (steps 1-5 are questions, after step 5 show result)
    if (typeof step === 'number' && step < 5) {
      setStep((step + 1) as QuizStep);
    } else {
      setStep('result');
    }
  };

  const shouldBookCall = (): boolean => {
    const { q4, q5 } = answers;

    // Route to call if: no system AND has a specific problem
    if ((q4 === 'nothing' || q4 === 'emails') &&
        (q5 === 'reviews' || q5 === 'slow-days' || q5 === 'reactivation')) {
      return true;
    }
    return false; // PDF route
  };

  const progress = step === 'result' ? 100 : ((Number(step) - 1) / 5) * 100;

  return (
    <main className="min-h-screen bg-brand-black text-white relative overflow-hidden">
      <AuroraBackground />

      {/* Header with logo */}
      <header className="relative z-10 px-6 md:px-12 py-6">
        <Link href="/" className="inline-block">
          <img
            src="/lockup.png"
            alt="RSL/A"
            className="h-12 md:h-16 w-auto"
          />
        </Link>
      </header>

      <div className="relative z-10 px-6 md:px-12 pb-20 max-w-3xl mx-auto">
        {/* LANDING PAGE CONTENT */}
        <div className="pt-4 md:pt-8">
          {/* Hero Headline */}
          <div className="text-center mb-10">
            <p className="text-brand-blue text-sm font-medium uppercase tracking-wider mb-3">
              Restaurant Growth System
            </p>
            <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-4">
              Get More Google Reviews &<br />
              <span className="text-brand-blue">Bring Back Lost Customers</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
              The exact system we used to add $25K in revenue for a Queens pizzeria in 60 days. No ad spend required.
            </p>
            {/* Hero CTA */}
            <button
              onClick={openQuiz}
              className="inline-block bg-brand-blue text-white px-10 py-4 rounded-full text-lg font-semibold shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_30px_rgba(0,112,243,0.6)] transition-all duration-300"
            >
              See If You Qualify
            </button>
          </div>

          {/* Loom video placeholder */}
          <div className="aspect-video bg-white/5 border border-white/10 rounded-2xl mb-10 flex items-center justify-center overflow-hidden">
            <div className="text-center text-white/40">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 hover:bg-white/20 transition-colors cursor-pointer">
                <svg className="w-10 h-10 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-sm">Watch how it works (2 min)</p>
            </div>
          </div>

          {/* Problem Agitation */}
          <div className="mb-10">
            <h2 className="text-xl font-bold font-display text-center mb-6">
              Does any of this sound familiar?
            </h2>
            <div className="grid gap-3">
              {[
                "Customers who loved your food haven't been back in months",
                "Tuesday and Wednesday nights are dead",
                "You're paying for 5+ apps that don't talk to each other",
                "Missed calls during rush hour are walking to your competitor",
              ].map((problem, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                  <span className="text-red-400 mt-0.5">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </span>
                  <p className="text-white/80">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mid-page CTA */}
          <div className="text-center mb-10">
            <button
              onClick={openQuiz}
              className="inline-block bg-brand-blue text-white px-8 py-3 rounded-full font-semibold shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_30px_rgba(0,112,243,0.6)] transition-all duration-300"
            >
              Get Your Free Growth Plan
            </button>
          </div>

          {/* Social Proof - iPhone Message Screenshots */}
          <div className="mb-10">
            <p className="text-white/40 text-sm text-center mb-8">What restaurant owners are saying:</p>

            {/* Testimonial 1 - Left aligned */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="flex-shrink-0">
                <IPhoneMockup
                  contactName="Mike R."
                  avatarInitials="MR"
                  timestamp="Yesterday"
                >
                  <MessageBubble>
                    Got 47 new reviews in the first month. Game changer for our visibility on Google.
                  </MessageBubble>
                </IPhoneMockup>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-white/80 text-lg leading-relaxed mb-2">
                  &ldquo;We went from page 3 to the top 5 in our area&rdquo;
                </p>
                <p className="text-white/40 text-sm">
                  Mike runs a family Italian restaurant in Brooklyn
                </p>
              </div>
            </div>

            {/* Testimonial 2 - Right aligned */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-6 mb-8">
              <div className="flex-shrink-0">
                <IPhoneMockup
                  contactName="Sarah T."
                  avatarInitials="ST"
                  timestamp="2 days ago"
                >
                  <MessageBubble>
                    Brought back $8K from customers we thought we&apos;d lost forever. This system pays for itself.
                  </MessageBubble>
                </IPhoneMockup>
              </div>
              <div className="flex-1 text-center md:text-right">
                <p className="text-white/80 text-lg leading-relaxed mb-2">
                  &ldquo;Best investment we made this year&rdquo;
                </p>
                <p className="text-white/40 text-sm">
                  Sarah owns two taco spots in Austin
                </p>
              </div>
            </div>

            {/* Testimonial 3 - Left aligned */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <IPhoneMockup
                  contactName="David L."
                  avatarInitials="DL"
                  timestamp="Last week"
                >
                  <MessageBubble>
                    Tuesday nights used to be dead. Now we&apos;re doing 30% more covers. The reactivation texts work.
                  </MessageBubble>
                </IPhoneMockup>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-white/80 text-lg leading-relaxed mb-2">
                  &ldquo;Slow nights aren&apos;t a problem anymore&rdquo;
                </p>
                <p className="text-white/40 text-sm">
                  David manages a steakhouse in Phoenix
                </p>
              </div>
            </div>
          </div>

          {/* Case Study Card */}
          <div className="bg-[#0d1117] border border-white/10 rounded-2xl p-8 mb-10">
            <p className="text-brand-blue text-xs font-medium uppercase tracking-[1.5px] mb-4">
              Local SEO & Customer Nurture
            </p>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight mb-4">
              From 14 to 132 Google Reviews and $25K in 60 Days
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Transformed a local pizza shop&apos;s online visibility, generating over 100 new reviews and a significant revenue bump through automated review requests and customer reactivation.
            </p>
            <div className="flex items-end justify-between pt-4 border-t border-white/10">
              <div className="text-center">
                <span className="text-2xl md:text-3xl text-white font-display font-bold block">
                  +<NumberCounter value={118} />
                </span>
                <span className="text-xs text-brand-blue uppercase tracking-[0.5px]">
                  New Google Reviews
                </span>
              </div>
              <div className="text-center">
                <span className="text-2xl md:text-3xl text-white font-display font-bold block">
                  $<NumberCounter value={25} suffix="K" />
                </span>
                <span className="text-xs text-brand-blue uppercase tracking-[0.5px]">
                  Extra Revenue
                </span>
              </div>
              <Link
                href="/work/spice-on-a-slice"
                className="group flex items-center gap-1.5 text-brand-blue text-sm font-medium hover:text-white transition-colors self-center"
              >
                <span>Read full case study</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-10">
            <h2 className="text-xl font-bold font-display text-center mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              <FAQItem question="How does the review system work?">
                After each order, customers automatically receive a text asking about their experience. Happy customers get directed to leave a Google review. Unhappy ones get routed to you privately so you can fix the issue before it becomes a bad review.
              </FAQItem>
              <FAQItem question="How do you bring back lost customers?">
                We identify customers who haven&apos;t ordered in 30-90 days and send them personalized texts with special offers. Most restaurants recover 15-25% of inactive customers within the first month.
              </FAQItem>
              <FAQItem question="What if I already have a POS or marketing system?">
                Our system works alongside your existing setup. We just need a CSV export of your customer list to get started. No complicated integrations required.
              </FAQItem>
              <FAQItem question="How much does it cost?">
                We&apos;re currently offering free implementation for select restaurants in exchange for a testimonial. Book a call to see if you qualify.
              </FAQItem>
              <FAQItem question="How long until I see results?">
                Most restaurants see their first batch of new Google reviews within the first week. Customer reactivation campaigns typically generate revenue within 48 hours of launch.
              </FAQItem>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <button
              onClick={openQuiz}
              className="inline-block bg-brand-blue text-white px-10 py-4 rounded-full text-lg font-semibold shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_30px_rgba(0,112,243,0.6)] transition-all duration-300"
            >
              See If You Qualify
            </button>
            <p className="text-white/40 text-sm mt-4">
              Takes 30 seconds. No email required.
            </p>
          </div>
        </div>
      </div>

      {/* Minimal footer */}
      <footer className="relative z-10 px-6 md:px-12 py-8 border-t border-white/10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <p className="text-white/40 text-sm">© 2026 RSL/A</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeQuiz}
          />

          {/* Modal */}
          <div className="relative w-full max-w-lg">
            {/* Quiz Card */}
            <div className="bg-[#0d1117] border border-white/10 rounded-[20px] overflow-hidden">
              {/* Progress bar accent at top */}
              {step !== 'result' && (
                <div className="h-1 bg-white/10">
                  <div
                    className="h-full bg-brand-blue transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              <div className="p-8 md:p-10">
                {/* Close button */}
                <div className="flex justify-end mb-6">
                  <button
                    onClick={closeQuiz}
                    className="text-white/40 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              {/* Question 1 */}
              {step === 1 && (
                <QuizQuestion
                  question="Do you own or manage a restaurant?"
                  options={[
                    { label: 'No', value: 'no' },
                    { label: 'Yes', value: 'yes' },
                  ]}
                  onAnswer={(value) => handleAnswer('q1', value)}
                />
              )}

              {/* Question 2 */}
              {step === 2 && (
                <QuizQuestion
                  question="Are you based in the US?"
                  options={[
                    { label: 'No', value: 'no' },
                    { label: 'Yes', value: 'yes' },
                  ]}
                  onAnswer={(value) => handleAnswer('q2', value)}
                  onBack={() => setStep(1)}
                />
              )}

              {/* Question 3 */}
              {step === 3 && (
                <QuizQuestion
                  question="Do you have a Google Business Profile?"
                  options={[
                    { label: 'No', value: 'no' },
                    { label: 'Yes', value: 'yes' },
                  ]}
                  onAnswer={(value) => handleAnswer('q3', value)}
                  onBack={() => setStep(2)}
                />
              )}

              {/* Question 4 - Segmentation */}
              {step === 4 && (
                <QuizQuestion
                  question="How do you currently bring back customers who haven't ordered in a while?"
                  options={[
                    { label: "We don't have anything set up", value: 'nothing' },
                    { label: 'We send emails sometimes', value: 'emails' },
                    { label: 'We already have an SMS/text system', value: 'sms' },
                  ]}
                  onAnswer={(value) => handleAnswer('q4', value)}
                  onBack={() => setStep(3)}
                  vertical
                />
              )}

              {/* Question 5 - Segmentation */}
              {step === 5 && (
                <QuizQuestion
                  question="What would help your restaurant most right now?"
                  options={[
                    { label: 'Getting more Google reviews', value: 'reviews' },
                    { label: 'Filling slow weekdays', value: 'slow-days' },
                    { label: 'Bringing back past customers', value: 'reactivation' },
                    { label: 'I want to learn more first', value: 'learn-more' },
                  ]}
                  onAnswer={(value) => handleAnswer('q5', value)}
                  onBack={() => setStep(4)}
                  vertical
                />
              )}

              {/* Result */}
              {step === 'result' && (
                <div className="text-center">
                  {shouldBookCall() ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-brand-blue/20 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                        You&apos;re a great fit for our system
                      </h2>
                      <p className="text-white/60 mb-8 max-w-md mx-auto">
                        Based on your answers, we can help you set up an automated system to bring back customers and get more reviews.
                      </p>
                      <p className="text-white/40 text-sm mb-4">
                        We&apos;re offering to implement this at no cost in exchange for a testimonial.
                      </p>
                      <Link
                        href="/inquiry-form"
                        className="inline-block bg-brand-blue text-white px-10 py-4 rounded-full text-lg font-semibold shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_30px_rgba(0,112,243,0.6)] transition-all duration-300"
                      >
                        Book a Strategy Call
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-brand-blue/20 flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                        Here&apos;s your free guide
                      </h2>
                      <p className="text-white/60 mb-8 max-w-md mx-auto">
                        We put together a step-by-step guide showing exactly how we helped a pizza shop add $25K in revenue.
                      </p>
                      <Link
                        href="/restaurants/guide"
                        className="inline-block bg-brand-blue text-white px-10 py-4 rounded-full text-lg font-semibold shadow-[0_0_20px_rgba(0,112,243,0.4)] hover:shadow-[0_0_30px_rgba(0,112,243,0.6)] transition-all duration-300 mb-4"
                      >
                        View the Guide
                      </Link>
                      <p className="text-white/40 text-sm">
                        Or{' '}
                        <Link href="/inquiry-form" className="text-brand-blue hover:underline">
                          book a call
                        </Link>
                        {' '}if you&apos;d like us to set this up for you.
                      </p>
                    </>
                  )}
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// Quiz Question Component
interface QuizQuestionProps {
  question: string;
  options: { label: string; value: string }[];
  onAnswer: (value: string) => void;
  onBack?: () => void;
  vertical?: boolean;
}

function QuizQuestion({ question, options, onAnswer, onBack, vertical = false }: QuizQuestionProps) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold font-display mb-8 text-center">
        {question}
      </h2>
      <div className={`${vertical ? 'flex flex-col gap-3' : 'flex flex-col sm:flex-row gap-4 justify-center items-center'}`}>
        {options.map((option) => {
          const isHighlighted = option.value === 'yes';
          return (
            <button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              className={`
                ${vertical ? 'w-full text-left' : 'flex-1 sm:flex-initial sm:min-w-[140px]'}
                px-6 py-4 rounded-xl
                font-medium
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-brand-blue/50
                ${isHighlighted
                  ? 'bg-brand-blue text-white border border-brand-blue shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_30px_rgba(0,112,243,0.5)]'
                  : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                }
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <div className="text-center mt-4 h-6">
        {onBack && (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 text-white/30 hover:text-white/60 text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
        )}
      </div>
    </div>
  );
}

// FAQ Accordion Item Component
interface FAQItemProps {
  question: string;
  children: React.ReactNode;
}

function FAQItem({ question, children }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <span className="font-medium text-white">{question}</span>
        <svg
          className={`w-5 h-5 text-brand-blue flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <p className="px-5 pb-4 text-white/60 text-sm leading-relaxed">
          {children}
        </p>
      )}
    </div>
  );
}
