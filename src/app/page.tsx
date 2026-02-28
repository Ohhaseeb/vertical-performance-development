import Link from "next/link"
import Image from "next/image"
import {
  CheckCircle,
  ClipboardCheck,
  Clock,
  Users,
  BarChart2,
  Calendar,
  Dumbbell,
  Target,
  TrendingUp,
  Flame,
  Zap,
  Trophy,
  ArrowRight,
  Play,
  Star,
  Shield,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0A0A0F] dark" style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
      {/* Floating Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-orange-500/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-barlow-condensed)" }}>VDP</span>
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <Link href="#program" className="font-medium text-gray-400 transition-colors duration-200 hover:text-orange-400 cursor-pointer">
              Program
            </Link>
            <Link href="#progress" className="font-medium text-gray-400 transition-colors duration-200 hover:text-orange-400 cursor-pointer">
              Progress
            </Link>
            <Link href="#trainers" className="font-medium text-gray-400 transition-colors duration-200 hover:text-orange-400 cursor-pointer">
              Trainers
            </Link>
            <Link href="#training" className="font-medium text-gray-400 transition-colors duration-200 hover:text-orange-400 cursor-pointer">
              Training
            </Link>
            <Link href="#testimonials" className="font-medium text-gray-400 transition-colors duration-200 hover:text-orange-400 cursor-pointer">
              Results
            </Link>
            <Link href="#pricing" className="font-medium text-gray-400 transition-colors duration-200 hover:text-orange-400 cursor-pointer">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">
              Login
            </Link>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg shadow-orange-500/25 cursor-pointer" asChild>
              <Link href="/signup">Start Training</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-28 lg:py-36 xl:py-48 overflow-hidden">
          {/* Background image - greyed out */}
          <div className="absolute inset-0">
            <Image
              src="/images/dumbell.png"
              alt=""
              fill
              className="object-cover grayscale opacity-30"
              priority
              quality={80}
            />
          </div>
          {/* Dark overlay + gradient effects on top of image */}
          <div className="absolute inset-0 bg-[#0A0A0F]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-orange-950/20 via-transparent to-[#0A0A0F]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px]" />

          <div className="relative container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center text-center mx-auto max-w-4xl">
              <div className="space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium">
                  <Flame className="h-4 w-4" />
                  Athletes Rejoice
                </div>

                {/* Logo */}
                <div className="flex justify-center">
                  <Image
                    src="/images/vdp real.png"
                    alt="VDP Logo"
                    width={300}
                    height={200}
                    className="object-contain w-[100px] sm:w-[120px] md:w-[160px] lg:w-[200px] xl:w-[250px] h-auto"
                    priority
                    quality={100}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>

                {/* Headline */}
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight uppercase leading-[0.9]"
                  style={{ fontFamily: "var(--font-barlow-condensed)" }}
                >
                  <span className="text-white">ELEVATE YOUR</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    VERTICAL JUMP
                  </span>
                </h1>

                {/* Subheadline */}
                <p className="text-base sm:text-lg md:text-xl text-gray-400 mx-auto max-w-2xl leading-relaxed">
                  VDP offers personalized week to week training tailored to each athlete&apos;s needs and goals to transform their vertical to the next level.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-2">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-orange-400" style={{ fontFamily: "var(--font-barlow-condensed)" }}>6-8&quot;</div>
                    <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">Avg. Inches Vertical Gained </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg shadow-orange-500/25 px-8 py-6 text-lg font-semibold cursor-pointer w-full sm:w-auto"
                    asChild
                  >
                    <Link href="#pricing" className="flex items-center gap-2">
                      Start Your Transformation
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 px-8 py-6 text-lg cursor-pointer w-full sm:w-auto"
                    asChild
                  >
                    <Link href="#training" className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      Watch Training
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workout Preview Cards / Program Section */}
        <section id="program" className="w-full py-16 md:py-24 lg:py-32 bg-[#0A0A0F] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/5 to-transparent" />
          <div className="relative container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-xs font-semibold uppercase tracking-wider">
                <Dumbbell className="h-3.5 w-3.5" />
                Our Program
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-white"
                style={{ fontFamily: "var(--font-barlow-condensed)" }}
              >
                Professional & Research-Based{" "}
                <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  Training
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-400 mx-auto max-w-2xl">
                VDP provides personalized training programs tailored to your exact needs. We don&apos;t use a one size fits all approach.
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 - Personalized Training */}
              <div className="group relative rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/50 to-[#0A0A0F] p-6 sm:p-8 transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <ClipboardCheck className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                  PERSONALIZED TRAINING
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Custom training plans tailored to your training history, available equipment, and time.
                </p>
              </div>

              {/* Card 2 - Consistent Schedule */}
              <div className="group relative rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/50 to-[#0A0A0F] p-6 sm:p-8 transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <Calendar className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                  CONSISTENT SCHEDULE
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Training is written out week by week, incorporating feedback from athletes and making adjustments as needed.
                </p>
              </div>

              {/* Card 3 - Performance Tracking */}
              <div className="group relative rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/50 to-[#0A0A0F] p-6 sm:p-8 transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <BarChart2 className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                  PERFORMANCE TRACKING
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Detailed progress monitoring with regular feedback and performance metrics.
                </p>
              </div>

              {/* Card 4 - Research Based */}
              <div className="group relative rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/50 to-[#0A0A0F] p-6 sm:p-8 transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <Clock className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                  RESEARCH BASED
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Utilize the most backed up training methods from peer reviewed articles and tested by us coaches.
                </p>
              </div>

              {/* Card 5 - Coach Support */}
              <div className="group relative rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/50 to-[#0A0A0F] p-6 sm:p-8 transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <Users className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                  COACH SUPPORT
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Guaranteed quick responses to any questions or concerns from our coaches as well as weekly phone call check-ins.
                </p>
              </div>

              {/* Card 6 - Injury Prevention */}
              <div className="group relative rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/50 to-[#0A0A0F] p-6 sm:p-8 transition-all duration-300 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <Shield className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                  INJURY PREVENTION
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  We will rehab your knee pain and make you become a more resilient athlete.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Tracking Demo Section */}
        <section id="progress" className="w-full py-16 md:py-24 lg:py-32 bg-[#0d0d14] relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[100px] -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-green-500/5 rounded-full blur-[100px] -translate-y-1/2" />

          <div className="relative container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-semibold uppercase tracking-wider">
                <TrendingUp className="h-3.5 w-3.5" />
                Track Your Gains
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-white"
                style={{ fontFamily: "var(--font-barlow-condensed)" }}
              >
                Watch Your{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Progress
                </span>{" "}
                Soar
              </h2>
              <p className="text-base sm:text-lg text-gray-400 mx-auto max-w-2xl">
                We track every metric that matters so you can see exactly how far you&apos;ve come.
              </p>
            </div>

            <div className="mx-auto max-w-5xl grid gap-6 lg:grid-cols-2 items-start">
              {/* Left - Vertical Jump Progress */}
              <div className="rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/60 to-[#0d0d14] p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                    Vertical Jump Progress
                  </h3>
                  <span className="text-xs text-green-400 font-medium bg-green-500/10 px-2.5 py-1 rounded-full">+8 inches</span>
                </div>

                {/* Progress visualization */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Starting</span>
                      <span className="text-sm font-bold text-gray-300">28&quot;</span>
                    </div>
                    <div className="h-3 rounded-full bg-gray-800 overflow-hidden">
                      <div className="h-full rounded-full bg-gray-600" style={{ width: "56%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Month 1</span>
                      <span className="text-sm font-bold text-gray-300">30&quot;</span>
                    </div>
                    <div className="h-3 rounded-full bg-gray-800 overflow-hidden">
                      <div className="h-full rounded-full bg-orange-500/70" style={{ width: "60%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Month 2</span>
                      <span className="text-sm font-bold text-gray-300">33&quot;</span>
                    </div>
                    <div className="h-3 rounded-full bg-gray-800 overflow-hidden">
                      <div className="h-full rounded-full bg-orange-500" style={{ width: "66%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-orange-400 font-medium">Month 3 (Current)</span>
                      <span className="text-sm font-bold text-orange-400">36&quot;</span>
                    </div>
                    <div className="h-3 rounded-full bg-gray-800 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-green-500" style={{ width: "72%" }} />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Goal</span>
                      <span className="text-sm font-bold text-green-400">40&quot;</span>
                    </div>
                    <div className="h-3 rounded-full bg-gray-800 overflow-hidden mt-2">
                      <div className="h-full rounded-full border-2 border-dashed border-green-500/40" style={{ width: "80%" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Strength Metrics */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/60 to-[#0d0d14] p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wide mb-6" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                    Strength Metrics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-gray-800/30 border border-gray-800/50">
                      <div className="text-2xl font-bold text-orange-400" style={{ fontFamily: "var(--font-barlow-condensed)" }}>355</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">LB Squat</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-800/30 border border-gray-800/50">
                      <div className="text-2xl font-bold text-orange-400" style={{ fontFamily: "var(--font-barlow-condensed)" }}>385</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">LB Deadlift</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-800/30 border border-gray-800/50">
                      <div className="text-2xl font-bold text-orange-400" style={{ fontFamily: "var(--font-barlow-condensed)" }}>250</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">LB Bench</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-gray-800/30 border border-gray-800/50">
                      <div className="text-2xl font-bold text-orange-400" style={{ fontFamily: "var(--font-barlow-condensed)" }}>215</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">LB Clean</div>
                    </div>
                  </div>
                </div>

                {/* Weekly Training Streak */}
                <div className="rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/60 to-[#0d0d14] p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wide" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                      Training Streak
                    </h3>
                    <div className="flex items-center gap-1.5 text-orange-400">
                      <Flame className="h-4 w-4" />
                      <span className="text-sm font-bold">12 weeks</span>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-8 rounded-md ${
                          i < 12
                            ? "bg-gradient-to-t from-orange-600 to-orange-400"
                            : "bg-gray-800"
                        }`}
                        style={{ opacity: 0.4 + (i * 0.05) }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">Consistent training = consistent results</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trainer Profiles Section */}
        <section id="trainers" className="w-full py-16 md:py-24 lg:py-32 bg-[#0A0A0F] relative">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-xs font-semibold uppercase tracking-wider">
                <Trophy className="h-3.5 w-3.5" />
                Meet Your Coaches
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-white"
                style={{ fontFamily: "var(--font-barlow-condensed)" }}
              >
                D1 Athletes.{" "}
                <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  Proven Coaches.
                </span>
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 items-start max-w-6xl mx-auto">
              {/* Coach Haseeb */}
              <div className="rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/40 to-[#0A0A0F] overflow-hidden">
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <Image
                    src="/images/jump.png"
                    alt="Coach Haseeb - Volleyball jump demonstration"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 text-orange-400 text-xs font-semibold">
                      <Zap className="h-3 w-3" />
                      Lead Coach
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                    COACH HASEEB
                  </h3>
                  <p className="text-sm text-orange-400 font-medium mb-4">SJSU D1 Volleyball &middot; 6&apos;0&quot;</p>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    5+ years of training, 4+ years of vertical jump training, and 2+ years of coaching volleyball. Transformed from not being able to touch rim to a 37-38 inch vertical purely through training and research.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-xl bg-gray-800/40 border border-gray-800/60">
                      <div className="text-xl font-bold text-orange-400" style={{ fontFamily: "var(--font-barlow-condensed)" }}>38&quot;</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Vertical</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-800/40 border border-gray-800/60">
                      <div className="text-xl font-bold text-orange-400" style={{ fontFamily: "var(--font-barlow-condensed)" }}>355</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">LB Squat</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-800/40 border border-gray-800/60">
                      <div className="text-xl font-bold text-orange-400" style={{ fontFamily: "var(--font-barlow-condensed)" }}>385</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">LB Dead</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coach Dylan */}
              <div className="rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/40 to-[#0A0A0F] overflow-hidden">
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <Image
                    src="/images/dylan_dunk.png"
                    alt="Coach Dylan - Athletic demonstration"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 text-orange-400 text-xs font-semibold">
                      <Zap className="h-3 w-3" />
                      Co-Founder
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                    COACH DYLAN
                  </h3>
                  <p className="text-sm text-orange-400 font-medium mb-4">SJSU D1 Volleyball &middot; 5&apos;8&quot;</p>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    Co-founded VDP because other vertical jump programs are too expensive and not personalized. Former THP athlete who realized athletes deserve better coaching at an affordable price.
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 rounded-xl bg-gray-800/40 border border-gray-800/60">
                      <div className="text-xl font-bold text-orange-400" style={{ fontFamily: "var(--font-barlow-condensed)" }}>40&quot;</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">Vertical</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-800/40 border border-gray-800/60">
                      <div className="text-xl font-bold text-orange-400" style={{ fontFamily: "var(--font-barlow-condensed)" }}>340</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">LB Squat</div>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-gray-800/40 border border-gray-800/60">
                      <div className="text-xl font-bold text-orange-400" style={{ fontFamily: "var(--font-barlow-condensed)" }}>360</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">LB Dead</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Story */}
            <div className="max-w-3xl mx-auto mt-16 text-center">
              <p className="text-gray-400 leading-relaxed">
                VDP was created because of a problem we had with other vertical jump programs &mdash; they&apos;re too expensive! The good ones like THP Strength cost upwards of $50/month, and the training wasn&apos;t even personalized. We were just a number to them. Here at VDP, we take great care of every client.
              </p>
            </div>
          </div>
        </section>

        {/* Training Sneak Peek Section */}
        <section id="training" className="w-full py-16 md:py-24 lg:py-32 bg-[#0d0d14] relative">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-xs font-semibold uppercase tracking-wider">
                <Play className="h-3.5 w-3.5" />
                Sneak Peek
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-white"
                style={{ fontFamily: "var(--font-barlow-condensed)" }}
              >
                Training &{" "}
                <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  Results
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-400 mx-auto max-w-2xl">
                A small taste of what you can expect from our training programs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {/* Video 1 - Get Stronger */}
              <div className="group rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/40 to-[#0d0d14] overflow-hidden transition-all duration-300 hover:border-orange-500/30">
                <div className="p-4 sm:p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Dumbbell className="h-5 w-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                    Get Stronger
                  </h3>
                </div>
                <div className="relative aspect-video bg-gray-900">
                  <iframe
                    src="https://www.youtube.com/embed/Dv_A5xZf-Z8"
                    title="Get Stronger Training Video"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Video 2 - Become Explosive */}
              <div className="group rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/40 to-[#0d0d14] overflow-hidden transition-all duration-300 hover:border-orange-500/30">
                <div className="p-4 sm:p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                    Become Explosive
                  </h3>
                </div>
                <div className="relative aspect-video bg-gray-900">
                  <iframe
                    src="https://www.youtube.com/embed/A7lqqQ1ERmg"
                    title="Become Explosive Training Video"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Video 3 - Physique Transformation */}
              <div className="group rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/40 to-[#0d0d14] overflow-hidden transition-all duration-300 hover:border-orange-500/30">
                <div className="p-4 sm:p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                    Physique Transformation
                  </h3>
                </div>
                <div className="relative aspect-video bg-gray-900">
                  <Image
                    src="/images/buff.png"
                    alt="Physique transformation results"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <Play className="h-7 w-7 text-white ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Video 4 - Exercise Variation */}
              <div className="group rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/40 to-[#0d0d14] overflow-hidden transition-all duration-300 hover:border-orange-500/30">
                <div className="p-4 sm:p-5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-barlow-condensed)" }}>
                    Exercise Variation
                  </h3>
                </div>
                <div className="relative aspect-video bg-gray-900">
                  <iframe
                    src="https://www.youtube.com/embed/NTRfFap1B0A"
                    title="Exercise Variation Training Video"
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-16 md:py-24 lg:py-32 bg-[#0A0A0F] relative">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-xs font-semibold uppercase tracking-wider">
                <Star className="h-3.5 w-3.5" />
                Athlete Results
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-white"
                style={{ fontFamily: "var(--font-barlow-condensed)" }}
              >
                Success{" "}
                <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  Stories
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-400 mx-auto max-w-2xl">
                Hear what our clients have to say about their experience with VDP training.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
              {/* Testimonial 1 */}
              <div className="rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/40 to-[#0A0A0F] p-6 sm:p-8">
                <div className="flex items-center gap-1.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  &ldquo;VDP and Coach Haseeb have been a game changer for me. I&apos;ve improved my vertical jump by 4 inches and my hitting power has increased. His attention to detail as well as being able to push me in my training helped me become more prepared for my D1 volleyball season.&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-800/60">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500/30">
                    <Image
                      src="/images/charles.png"
                      alt="Charles Carroll"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white">Charles Carroll</p>
                    <p className="text-sm text-orange-400">D1 Outside Hitter &middot; St. Thomas Aquinas</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full">+4&quot;</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/40 to-[#0A0A0F] p-6 sm:p-8">
                <div className="flex items-center gap-1.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6 italic">
                  &ldquo;As a teammate of Haseeb in college volleyball, he was always the one that was able to jump higher than everyone else. I knew he had a secret to his success and now I know what it is. Its all the vertical jump training he has been doing the past 4 years. Being able to talk to him about what type of training he has done gives me reassurance he knows what he is doing.&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-4 border-t border-gray-800/60">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-500/30">
                    <Image
                      src="/images/Gurmehak.png"
                      alt="Gurmehak Singh"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white">Gurmehak Singh</p>
                    <p className="text-sm text-orange-400">Middle Blocker &middot; SJSU D1 Volleyball</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing / Subscription CTAs Section */}
        <section id="pricing" className="w-full py-16 md:py-24 lg:py-32 bg-[#0d0d14] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/5 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/5 rounded-full blur-[120px]" />

          <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-semibold uppercase tracking-wider">
                <Flame className="h-3.5 w-3.5" />
                Start Today
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase text-white"
                style={{ fontFamily: "var(--font-barlow-condensed)" }}
              >
                Training Programs for{" "}
                <span className="bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  Every Level
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-400 mx-auto max-w-2xl">
                Choose the program that matches your goals and commitment level.
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {/* Basic Plan */}
              <div className="rounded-2xl border border-gray-800/80 bg-gradient-to-b from-gray-900/40 to-[#0d0d14] p-6 sm:p-8 flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white uppercase mb-2" style={{ fontFamily: "var(--font-barlow-condensed)" }}>Basic</h3>
                  <p className="text-sm text-gray-500">Perfect for all athletes</p>
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-bold text-white" style={{ fontFamily: "var(--font-barlow-condensed)" }}>$10</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Customized week to week training</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Group chat with coaches for questions and form review</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Daily progress tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Nutrition guidance</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-200 py-6 text-base font-semibold cursor-pointer"
                  asChild
                >
                  <Link href="/signup" className="flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Performance Plan */}
              <div className="rounded-2xl border border-orange-500/40 bg-gradient-to-b from-orange-950/20 via-gray-900/40 to-[#0d0d14] p-6 sm:p-8 flex flex-col relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white uppercase mb-2" style={{ fontFamily: "var(--font-barlow-condensed)" }}>Performance</h3>
                  <p className="text-sm text-gray-500">For dedicated athletes</p>
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-bold text-white" style={{ fontFamily: "var(--font-barlow-condensed)" }}>$25</span>
                  <span className="text-gray-500">/ 3 months</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Customized week to week training</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Group chat + weekly one-on-one calls with coaches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Daily progress tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">Nutrition guidance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300 font-medium">4-6 inches of vertical jump increase guaranteed within 3 months or free training until you hit that goal</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg shadow-orange-500/25 py-6 text-base font-semibold cursor-pointer"
                  asChild
                >
                  <Link href="/signup" className="flex items-center justify-center gap-2">
                    Start Training Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Guarantee Banner */}
            <div className="max-w-4xl mx-auto mt-10">
              <div className="rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-barlow-condensed)" }}>RESULTS GUARANTEE</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    With the Performance plan, we guarantee 4-6 inches of vertical jump increase within 3 months &mdash; or we train you for free until you reach your goal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-16 md:py-24 bg-[#0A0A0F] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-orange-950/10 to-transparent" />
          <div className="relative container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase text-white mb-6"
              style={{ fontFamily: "var(--font-barlow-condensed)" }}
            >
              READY TO{" "}
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                FLY HIGHER?
              </span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              Join the athletes who are already transforming their vertical with VDP.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg shadow-orange-500/25 px-10 py-6 text-lg font-semibold cursor-pointer"
              asChild
            >
              <Link href="/signup" className="flex items-center gap-2">
                Start Your Transformation
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800/60 bg-[#0A0A0F] py-8 md:py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-barlow-condensed)" }}>VDP</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Helping athletes reach their full potential through personalized training.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-barlow-condensed)" }}>Program</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-500 cursor-default hover:text-gray-400 transition-colors">Training Approach</span></li>
                <li><span className="text-gray-500 cursor-default hover:text-gray-400 transition-colors">Pricing</span></li>
                <li><span className="text-gray-500 cursor-default hover:text-gray-400 transition-colors">FAQ</span></li>
                <li><span className="text-gray-500 cursor-default hover:text-gray-400 transition-colors">Training Locations</span></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-barlow-condensed)" }}>Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-500 cursor-default hover:text-gray-400 transition-colors">Blog</span></li>
                <li><span className="text-gray-500 cursor-default hover:text-gray-400 transition-colors">Training Tips</span></li>
                <li><span className="text-gray-500 cursor-default hover:text-gray-400 transition-colors">Nutrition Guide</span></li>
                <li><span className="text-gray-500 cursor-default hover:text-gray-400 transition-colors">Training Videos</span></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider" style={{ fontFamily: "var(--font-barlow-condensed)" }}>Contact</h3>
              <ul className="space-y-2 text-sm">
                <li><span className="text-gray-500 cursor-default hover:text-gray-400 transition-colors">About Us</span></li>
                <li><span className="text-gray-500 cursor-default hover:text-gray-400 transition-colors">Contact</span></li>
                <li><span className="text-gray-500 cursor-default hover:text-gray-400 transition-colors">Privacy Policy</span></li>
                <li><span className="text-gray-500 cursor-default hover:text-gray-400 transition-colors">Terms of Service</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} VDP. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 hover:text-orange-400 transition-colors duration-200 cursor-pointer">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
              </span>
              <span className="text-gray-600 hover:text-orange-400 transition-colors duration-200 cursor-pointer">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </span>
              <span className="text-gray-600 hover:text-orange-400 transition-colors duration-200 cursor-pointer">
                <span className="sr-only">Facebook</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </span>
              <span className="text-gray-600 hover:text-orange-400 transition-colors duration-200 cursor-pointer">
                <span className="sr-only">YouTube</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
