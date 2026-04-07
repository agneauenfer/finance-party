function Section({ children, className = '', id = '', noGap = false }) {
  return (
    <section 
      className={`section ${className}`} 
      id={id} 
      style={{ marginTop: noGap ? '0' : 'var(--section-gap)' }}
    >
      {children}
    </section>
  );
}

export default Section;