import Link from "next/link";
import Image from "next/image";

export default function NotesPage() {
  return (
    <main className="relative bg-void min-h-screen">
      <article className="max-w-prose mx-auto px-6 md:px-8 py-24">
        {/* Back link */}
        <Link
          href="/"
          className="inline-block mb-12 text-sm text-ash hover:text-parchment transition-colors"
        >
          ← Return to story
        </Link>

        {/* Author's Note */}
        <section className="mb-16">
          <h2 className="font-display font-semibold text-2xl text-white mb-6">
            Author's Note
          </h2>
          <div className="font-body text-parchment leading-relaxed space-y-4">
            <p>
              This piece is drawn from a real injury and its aftermath. The story reflects my subjective experience of pain, disorientation, and dependency during recovery. What follows is a factual medical narrative written for clinical clarity, included here for completeness.
            </p>
          </div>
          
          {/* Author Image */}
          <div className="mt-8 flex justify-center">
            <div className="w-64 h-64 relative rounded-full overflow-hidden border-2 border-ash/30">
              <Image
                src="/images/author.jpg"
                alt="Robert Cushman"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
          </div>
          <p className="text-center mt-3 text-sm text-ash">
            Robert Cushman
          </p>
        </section>

        {/* Clinical Appendix */}
        <section>
          <h2 className="font-display font-semibold text-2xl text-white mb-8">
            Clinical Appendix
          </h2>

          <h3 className="font-display font-semibold text-lg text-white/90 mb-6">
            Patient Injury Narrative – Knee Injury After Syncope in Shower
          </h3>

          {/* Patient Information */}
          <div className="mb-8">
            <h4 className="font-display font-medium text-base text-white/80 mb-3">
              Patient Information
            </h4>
            <ul className="font-body text-parchment/90 text-sm leading-relaxed space-y-1 list-disc list-inside">
              <li><strong>Patient:</strong> Robert Cushman</li>
              <li><strong>Date of Injury:</strong> December 28</li>
              <li><strong>Relevant History:</strong> Psoriatic arthritis; chronic joint pain; recent back injury (improving prior to this event)</li>
            </ul>
          </div>

          {/* Precipitating Factors */}
          <div className="mb-8">
            <h4 className="font-display font-medium text-base text-white/80 mb-3">
              1. Precipitating Factors (Context)
            </h4>
            <ul className="font-body text-parchment/90 text-sm leading-relaxed space-y-1 list-disc list-inside">
              <li>Traveling from Guadalajara to Puebla</li>
              <li>Significant sleep deprivation (awake most of Saturday, early flight Sunday)</li>
              <li>Full day of activity on arrival</li>
              <li>Physical fatigue and baseline joint pain related to psoriatic arthritis</li>
            </ul>
          </div>

          {/* Bath and Presyncopal Symptoms */}
          <div className="mb-8">
            <h4 className="font-display font-medium text-base text-white/80 mb-3">
              2. Bath and Presyncopal Symptoms
            </h4>
            <div className="font-body text-parchment/90 text-sm leading-relaxed space-y-3">
              <ul className="space-y-1 list-disc list-inside">
                <li>Evening hot bath in a deep hotel bathtub</li>
                <li>Bath duration approximately 15–25 minutes</li>
                <li>Water temperature was quite hot</li>
                <li>Remained in bath longer than usual due to fatigue and joint soreness</li>
              </ul>
              <p className="font-medium text-parchment">Upon attempting to exit the tub:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Tub was deep and difficult to exit</li>
                <li>Required significant effort and repositioning (hands and knees, then kneeling upright)</li>
              </ul>
              <p className="font-medium text-parchment">Upon standing:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Experienced lightheadedness and visual black spots</li>
                <li>Brief presyncopal episode that seemed to pass</li>
              </ul>
            </div>
          </div>

          {/* Syncope and Fall */}
          <div className="mb-8">
            <h4 className="font-display font-medium text-base text-white/80 mb-3">
              3. Syncope and Fall in Shower (Primary Injury Event)
            </h4>
            <div className="font-body text-parchment/90 text-sm leading-relaxed space-y-3">
              <ul className="space-y-1 list-disc list-inside">
                <li>Entered the shower to rinse off bathwater and oil</li>
                <li>Shower and floor surfaces were marble and slippery</li>
                <li>Water temperature was comfortable</li>
                <li>Loss of consciousness occurred shortly after entering the shower</li>
                <li>No memory of the fall</li>
              </ul>
              <p className="font-medium text-parchment">Upon regaining consciousness:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Found lying on the shower floor in a "wishbone" position</li>
                <li>Both knees bent and forced outward, pinned against the sides of the shower space</li>
                <li>Head positioned under the shower bench</li>
                <li>Immediate and severe bilateral knee pain</li>
              </ul>
            </div>
          </div>

          {/* Immediate Aftermath */}
          <div className="mb-8">
            <h4 className="font-display font-medium text-base text-white/80 mb-3">
              4. Immediate Aftermath and Functional Limitation
            </h4>
            <div className="font-body text-parchment/90 text-sm leading-relaxed space-y-3">
              <ul className="space-y-1 list-disc list-inside">
                <li>Unable to stand or reposition legs normally due to pain</li>
                <li>Used upper body strength to partially reposition and slide out of the shower</li>
                <li>Called for wife for assistance</li>
              </ul>
              <p className="font-medium text-parchment">With assistance:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Able to stand</li>
                <li>Walked with a severely altered and painful gait</li>
                <li>Attempting to lift legs onto the bed caused extreme pain</li>
                <li>Required assistance lifting legs into bed</li>
                <li>Pain described as intense, deep, and persistent</li>
                <li>No obvious deformity noted</li>
                <li>Minimal visible swelling or bruising</li>
                <li>Significant emotional distress related to pain and concern for long-term mobility</li>
              </ul>
            </div>
          </div>

          {/* Symptoms Over Following Days */}
          <div className="mb-8">
            <h4 className="font-display font-medium text-base text-white/80 mb-3">
              5. Symptoms Over the Following Days
            </h4>
            <div className="font-body text-parchment/90 text-sm leading-relaxed space-y-3">
              <p className="font-medium text-parchment">Days 1–3:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Severe bilateral knee pain</li>
                <li>Very limited mobility</li>
                <li>Walking only possible with extreme care and altered gait</li>
              </ul>
              <p className="text-parchment/80">Pain worsened with:</p>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li>Weight bearing</li>
                <li>Certain knee angles</li>
                <li>Lifting legs (e.g., getting into bed)</li>
              </ul>
              <p className="font-medium text-parchment">Days 4–7:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Gradual improvement in ability to walk</li>
                <li>Persistent baseline pain even at rest</li>
              </ul>
              <p className="text-parchment/80">Pain worsened with:</p>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li>Walking longer distances</li>
                <li>Getting into or out of a car</li>
                <li>Sitting and then lifting the leg (knee flexed ~90°)</li>
                <li>Occasional popping sensations in knees (not constant)</li>
                <li>Minimal swelling or bruising throughout</li>
              </ul>
            </div>
          </div>

          {/* Current Status */}
          <div className="mb-8">
            <h4 className="font-display font-medium text-base text-white/80 mb-3">
              6. Current Status (Approximately Day 7 Post-Injury)
            </h4>
            <div className="font-body text-parchment/90 text-sm leading-relaxed space-y-3">
              <p>Able to walk independently with:</p>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li>Deliberate movements</li>
                <li>Altered gait</li>
                <li>Ongoing pain</li>
              </ul>
              <ul className="space-y-1 list-disc list-inside">
                <li>Constant low-level knee pain at rest</li>
              </ul>
              <p className="text-parchment/80">Significant pain with:</p>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li>Knee flexion</li>
                <li>Lifting legs</li>
                <li>Getting into a car</li>
              </ul>
              <ul className="space-y-1 list-disc list-inside">
                <li>Taking tramadol (previously prescribed for psoriatic arthritis), which provides partial relief</li>
                <li>Over-the-counter anti-inflammatory medications provided minimal relief</li>
              </ul>
            </div>
          </div>

          {/* Patient Concerns */}
          <div className="mb-8">
            <h4 className="font-display font-medium text-base text-white/80 mb-3">
              7. Patient Concerns
            </h4>
            <ul className="font-body text-parchment/90 text-sm leading-relaxed space-y-1 list-disc list-inside">
              <li>Concern for internal knee injury (meniscus, cartilage, ligament, or bone contusion)</li>
              <li>Concern for trauma-triggered inflammatory flare related to psoriatic arthritis</li>
              <li>Desire to rule out injuries requiring:
                <ul className="ml-6 mt-1 space-y-1 list-disc list-inside">
                  <li>Imaging beyond X-rays</li>
                  <li>Orthopedic or sports medicine evaluation</li>
                  <li>Physical therapy or other interventions</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Clinical Summary */}
          <div className="mb-8 p-4 border-l-2 border-ash/30">
            <h4 className="font-display font-medium text-base text-white/80 mb-3">
              One-Sentence Clinical Summary
            </h4>
            <p className="font-body text-parchment/90 text-sm leading-relaxed italic">
              After sleep deprivation and a prolonged hot bath, the patient experienced syncope in a marble shower and awoke with both knees forcibly abducted and pinned, followed by severe bilateral knee pain persisting seven days with difficulty weight bearing, lifting the legs, and entering a vehicle.
            </p>
          </div>
        </section>

        {/* Back link bottom */}
        <Link
          href="/"
          className="inline-block mt-16 text-sm text-ash hover:text-parchment transition-colors"
        >
          ← Return to story
        </Link>
      </article>
    </main>
  );
}
