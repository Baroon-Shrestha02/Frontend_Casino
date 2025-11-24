import CasinoCTASection from "../HelperComponents/CasinoCTASection";

export default function HomePage() {
  return (
    <div className="m-3 md:m-6 rounded-3xl">
      <CasinoCTASection
        // videoSrc="/uploads/home/intro1.mp4"
        imageSrc="/uploads/home/cta.jpg"
        heading="Your Casino Career"
        highlight="Starts Here"
        subheading="Seats Filling Fast!"
        description="Join thousands of successful casino dealers worldwide. Professional training, guaranteed placement, and a career that travels the globe."
        buttonText="Enroll Now"
      />
    </div>
  );
}
