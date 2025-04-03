import Link from "next/link"
import Image from "next/image"
import { CheckCircle, ClipboardCheck, Clock, Users, Award, BarChart2, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black dark">
      <header className="sticky top-0 z-40 border-b border-neutral-900 bg-black">
        <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-400">VPD</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#program" className="font-medium text-gray-200 transition-colors hover:text-blue-400">
              Program
            </Link>
            <Link href="#about" className="font-medium text-gray-200 transition-colors hover:text-blue-400">
              About Us
            </Link>
            <Link href="#testimonials" className="font-medium text-gray-200 transition-colors hover:text-blue-400">
              Testimonials
            </Link>
            <Link href="#pricing" className="font-medium text-gray-200 transition-colors hover:text-blue-400">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-200 hover:underline underline-offset-4">
              Client Login
            </Link>
            <Button className="bg-gradient-to-r from-blue-600 to-white text-gray-900 hover:opacity-90" asChild>
              <Link href="/signup">Join Program</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-blue-900 to-black">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Elevate Your Vertical Jump
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl mx-auto">
                  VPD offers personalized week to week training tailored to each athlete's needs and goals to transform their vertical to the next level. 
                </p>
                <div className="pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-white text-gray-900 hover:opacity-90 px-20 min-w-[300px]"
                    asChild
                  >
                    <Link href="/signup">Your Vertical Jump Transformation Starts Here</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-blue-500 to-black"></div>

        {/* Program Section */}
        <section id="program" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  Professional and Researched Based Vertical Jump Training
                </h2>
                <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed">
                  VPD provides personalized training programs tailored to your exact needs, we dont use a one size fits all approach.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="bg-neutral-950 border border-blue-500">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full border border-blue-500 bg-gradient-to-b from-gray-800 to-black flex items-center justify-center mb-2">
                    <ClipboardCheck className="h-8 w-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Personalized Training</CardTitle>
                  <CardDescription className="text-gray-200">
                    Custom training plans tailored to your training history, available equipment, and time.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-neutral-950 border border-blue-500">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full border border-blue-500 bg-gradient-to-b from-gray-800 to-black flex items-center justify-center mb-2">
                    <Calendar className="h-8 w-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Consistent Schedule</CardTitle>
                  <CardDescription className="text-gray-200">
                    Training is written out week by week, incorpating feedback from the athletes and making adjustments as needed.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-neutral-950 border border-blue-500">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full border border-blue-500 bg-gradient-to-b from-gray-800 to-black flex items-center justify-center mb-2">
                    <BarChart2 className="h-8 w-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Performance Tracking</CardTitle>
                  <CardDescription className="text-gray-200">
                    Detailed progress monitoring with regular feedback and performance metrics.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-neutral-950 border border-blue-500">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full border border-blue-500 bg-gradient-to-b from-gray-800 to-black flex items-center justify-center mb-2">
                    <Clock className="h-8 w-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Researched Based</CardTitle>
                  <CardDescription className="text-gray-200">
                    Utilize the most backed up training methods from peer reviewed articles and tested by us coaches.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-neutral-950 border border-blue-500">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full border border-blue-500 bg-gradient-to-b from-gray-800 to-black flex items-center justify-center mb-2">
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Consistent feedback and support from coaches</CardTitle>
                  <CardDescription className="text-gray-200">
                    Guaranteed quick responses to any questions or concerns from our coaches as well as weekly phone call check ins.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-neutral-950 border border-blue-500">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full border border-blue-500 bg-gradient-to-b from-gray-800 to-black flex items-center justify-center mb-2">
                    <Award className="h-8 w-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Injury Rehab and Prevention</CardTitle>
                  <CardDescription className="text-gray-200">
                    We will rehab your knee pain and make you become a more resilent athlete. 
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-blue-500 to-black"></div>

        {/* About Us Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-neutral-950">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  About VDP
                </h2>
                <p className="text-gray-200 md:text-lg">
                  Hi there! I'm Coach Haseeb and I have been training for 5+ years, vertical jump training for 4+ years, and coaching volleyball for 2+ years. I transformed my vertical from not even being able to touch rim to a 37-38 inch vertical purely through training and research. I love training and have a passion for helping athletes reach their full potential, VPD was created to be an more affordable option for athletes willing to put in the hard work to increase their vertical.
                </p>
                <p className="text-gray-200 md:text-lg">
                  VDP was created by me because of a problem I had with other vertical jump programs. They are too expensive! I'm talking about the good ones like THP Strength, not the ones that are just super generic and outdated. I say this because I was once a THP athlete myself paying upwards of $50 a month for a training methodologies that I had already been applying to myself (P.S that was on a discount, their regular price was over $100 a month!)
                </p>
                <p className="text-gray-200 md:text-lg">
                  But the main issue lies in the fact that the training was not personalized to the athlete and I was just simply not getting responses to my questions on a timely matter, it felt like I was just a number to them. I've been there, done that, and I'm here to tell you that here at VDP we take great care of our clients. This is a guarantee because unlike these other programs which are big businesses, VDP has much less clients meaning we can give you the attention you deserve.
                </p>
                <ul className="text-gray-200 md:text-lg">
                  <li>Below are my stats as an athlete:</li>
                  <li className="flex items-center">
                    <span className="mr-2 text-white">•</span> Vertical Jump: 38 inch
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-white">•</span> Squat: 355LB
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-white">•</span> Deadlift: 385LB
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-white">•</span> Bench Press: 250LB
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-white">•</span> Power Clean: 215LB
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-white">•</span> Volleyball at SJSU D1 team
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-white">•</span> 162LB with less than 12% body fat
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <div className="relative h-auto aspect-[4/3] overflow-hidden rounded-lg border border-blue-500">
                  <Image
                    src="/images/jump.png"
                    alt="Volleyball jump demonstration"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
                <div className="relative h-auto aspect-[2/3] overflow-hidden rounded-lg border border-blue-500">
                  <Image
                    src="/images/buff.png"
                    alt="Physique demonstration"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-blue-500 to-black"></div>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  Success Stories from Our Athletes
                </h2>
                <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed">
                  Hear what our clients have to say about their experience with VPD training.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:gap-12">
              <Card className="bg-neutral-950 border border-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                
                    <div>
                      <p className="mb-2 italic text-gray-200">
                        "VDP and Coach Haseeb have been a game changer for me. I've improved my vertical jump by 4 inches and my hitting power has increased. His attention to detail as well as being able to push me in my training helped me become more prepared for my D1 volleyball season."
                      </p>
                      <p className="font-semibold text-white">Charles Carroll</p>
                      <p className="text-sm text-gray-300">D1 Outside Hitter at St. Thomas Aquinas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-neutral-950 border border-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    
                    <div>
                      <p className="mb-2 italic text-gray-200">
                        "As a teamate of Haseeb in college volleyball, he was always the one that was able to jump higher than everyone else. I knew he had a secret to his success and now I know what it is. Its all the vertical jump training he has been doing the past 4 years, being able to talk to him about what type of training he has done and compare to my own gives me reassurance he knows what he is doing."
                      </p>
                      <p className="font-semibold text-white">Dylan Lau</p>
                      <p className="text-sm text-gray-300">Outside Hitter/Volleyball Coach, SJSU D1 Volleyball </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-blue-500 to-black"></div>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-neutral-950">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  Training Programs for Every Level
                </h2>
                <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed">
                  Choose the program that matches your goals and commitment level.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:gap-12">
              <Card className="bg-neutral-950 border border-blue-500">
                <CardHeader>
                  <CardTitle className="text-white">Basic</CardTitle>
                  <div className="text-3xl font-bold text-white">
                    $8<span className="text-sm font-normal text-gray-300">/month</span>
                  </div>
                  <CardDescription className="text-gray-200">Perfect for all</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Customized week to week training</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Group Chat with coaches for questions and form review</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Daily progress tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Nutrition guidance</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-white text-gray-900 hover:opacity-90"
                    asChild
                  >
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card className="bg-neutral-950 border border-blue-500">
                <CardHeader>
                  <div className="text-center text-sm font-medium text-blue-400 mb-2">MOST POPULAR</div>
                  <CardTitle className="text-white">Performance</CardTitle>
                  <div className="text-3xl font-bold text-white">
                    $10<span className="text-sm font-normal text-gray-300">/month</span>
                  </div>
                  <CardDescription className="text-gray-200">For dedicated athletes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Customized week to week training</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Group Chat as well as weekly one on one calls with coaches</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Daily Progess Tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Nutrition guidance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-7 w-7 text-blue-400" />
                      <span className="text-gray-200">3 inches of vertical jump increase guaranteed within 3 months or you get trained for free until you hit that goal</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-white text-gray-900 hover:opacity-90"
                    asChild
                  >
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-neutral-900 bg-black py-6 md:py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-blue-400">VPD</span>
              </div>
              <p className="text-sm text-gray-300">
                Volleyball Performance Development - Helping athletes reach their full potential through personalized
                training.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Program</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-gray-300 cursor-default">Training Approach</span>
                </li>
                <li>
                  <span className="text-gray-300 cursor-default">Pricing</span>
                </li>
                <li>
                  <span className="text-gray-300 cursor-default">FAQ</span>
                </li>
                <li>
                  <span className="text-gray-300 cursor-default">Training Locations</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-gray-300 cursor-default">Blog</span>
                </li>
                <li>
                  <span className="text-gray-300 cursor-default">Training Tips</span>
                </li>
                <li>
                  <span className="text-gray-300 cursor-default">Nutrition Guide</span>
                </li>
                <li>
                  <span className="text-gray-300 cursor-default">Training Videos</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-gray-300 cursor-default">About Us</span>
                </li>
                <li>
                  <span className="text-gray-300 cursor-default">Contact</span>
                </li>
                <li>
                  <span className="text-gray-300 cursor-default">Privacy Policy</span>
                </li>
                <li>
                  <span className="text-gray-300 cursor-default">Terms of Service</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-300">
              © {new Date().getFullYear()} Volleyball Performance Development. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-300 cursor-default">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </span>
              <span className="text-gray-300 cursor-default">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </span>
              <span className="text-gray-300 cursor-default">
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </span>
              <span className="text-gray-300 cursor-default">
                <span className="sr-only">YouTube</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-youtube"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

