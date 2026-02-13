type Props = {
  label: string;
  name: string;
  handle: string;
  bio: string;
};

export default function HeroSection({ label, name, handle, bio }: Props) {
  return (
    <section className="hero js-hero">
      <p className="label">{label}</p>
      <h1>{name}</h1>
      <p className="subtitle">@{handle}</p>
      <p className="bio">{bio}</p>
    </section>
  );
}
