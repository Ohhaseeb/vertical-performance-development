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
            <Image
              src="/placeholder.svg?height=32&width=32"
              width={32}
              height={32}
              alt="VPD Logo"
              className="rounded"
            />
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
                  Elevate Your Volleyball Performance
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl mx-auto">
                  VPD offers personalized volleyball training programs designed to take your skills to the next level
                  with expert coaching and proven development methods.
                </p>
                <div className="pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-white text-gray-900 hover:opacity-90 px-20 min-w-[300px]"
                    asChild
                  >
                    <Link href="/signup">Join Our Program</Link>
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
                  Professional Volleyball Development Training
                </h2>
                <p className="max-w-[900px] text-gray-200 md:text-xl/relaxed">
                  VPD provides personalized training programs tailored to your specific position, skill level, and
                  goals.
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
                    Custom training plans tailored to your position, skill level, and performance goals.
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
                    Regular training sessions with clear objectives and progression paths.
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
                  <CardTitle className="text-white">Efficient Training</CardTitle>
                  <CardDescription className="text-gray-200">
                    Focused sessions that maximize improvement in minimal time with proven techniques.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-neutral-950 border border-blue-500">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full border border-blue-500 bg-gradient-to-b from-gray-800 to-black flex items-center justify-center mb-2">
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Group & Individual</CardTitle>
                  <CardDescription className="text-gray-200">
                    Balance of team-based training and individual skill development sessions.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-neutral-950 border border-blue-500">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 rounded-full border border-blue-500 bg-gradient-to-b from-gray-800 to-black flex items-center justify-center mb-2">
                    <Award className="h-8 w-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Achievement System</CardTitle>
                  <CardDescription className="text-gray-200">
                    Motivational milestones and recognition to celebrate your progress and improvements.
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
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">
                  About Volleyball Performance Development
                </h2>
                <p className="text-gray-200 md:text-lg">
                  Founded by professional volleyball players and certified coaches, VPD was created with a singular
                  mission: to provide athletes with the highest quality volleyball training available.
                </p>
                <p className="text-gray-200 md:text-lg">
                  Our team combines decades of competitive experience with cutting-edge training methodologies to
                  develop programs that deliver measurable results. We understand the unique demands of the sport and
                  tailor our approach to each athlete's specific needs.
                </p>
                <p className="text-gray-200 md:text-lg">
                  Whether you're looking to earn a college scholarship, improve your club team performance, or simply
                  become the best player you can be, our structured development programs will help you reach your goals.
                </p>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg border border-blue-500">
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-gray-400">
                  <p className="text-center">Team Image</p>
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
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      width={60}
                      height={60}
                      alt="Emma"
                      className="rounded-full"
                    />
                    <div>
                      <p className="mb-2 italic text-gray-200">
                        "The personalized training program from VPD has transformed my game. I've improved my vertical
                        jump by 4 inches and my hitting accuracy has made me a go-to player on my team. The coach's
                        attention to detail is incredible."
                      </p>
                      <p className="font-semibold text-white">Emma Chen</p>
                      <p className="text-sm text-gray-300">Outside Hitter, High School Senior</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-neutral-950 border border-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      width={60}
                      height={60}
                      alt="Marcus"
                      className="rounded-full"
                    />
                    <div>
                      <p className="mb-2 italic text-gray-200">
                        "As a libero, I needed specialized training to improve my defensive skills. VPD created a
                        program that focused on my reaction time and court positioning. After 3 months, my coach noticed
                        a huge difference in my game awareness."
                      </p>
                      <p className="font-semibold text-white">Marcus Johnson</p>
                      <p className="text-sm text-gray-300">Libero, Club Volleyball</p>
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
                    $10<span className="text-sm font-normal text-gray-300">/month</span>
                  </div>
                  <CardDescription className="text-gray-200">Perfect for beginners</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">1 training session per week</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Basic skill development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Monthly progress tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Access to client portal</span>
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
                    $15<span className="text-sm font-normal text-gray-300">/month</span>
                  </div>
                  <CardDescription className="text-gray-200">For dedicated athletes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">2 training sessions per week</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Advanced skill development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Bi-weekly progress tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      <span className="text-gray-200">Video analysis feedback</span>
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
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-neutral-900 bg-black py-6 md:py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  width={32}
                  height={32}
                  alt="VPD Logo"
                  className="rounded"
                />
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
                  <Link href="#program" className="text-gray-300 hover:text-blue-400">
                    Training Approach
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-300 hover:text-blue-400">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-blue-400">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="text-gray-300 hover:text-blue-400">
                    Training Locations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/blog" className="text-gray-300 hover:text-blue-400">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-gray-300 hover:text-blue-400">
                    Training Tips
                  </Link>
                </li>
                <li>
                  <Link href="/nutrition" className="text-gray-300 hover:text-blue-400">
                    Nutrition Guide
                  </Link>
                </li>
                <li>
                  <Link href="/videos" className="text-gray-300 hover:text-blue-400">
                    Training Videos
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-blue-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-blue-400">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-blue-400">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-blue-400">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-300">
              © {new Date().getFullYear()} Volleyball Performance Development. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-300 hover:text-blue-400">
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
              </Link>
              <Link href="#" className="text-gray-300 hover:text-blue-400">
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
              </Link>
              <Link href="#" className="text-gray-300 hover:text-blue-400">
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
              </Link>
              <Link href="#" className="text-gray-300 hover:text-blue-400">
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
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

