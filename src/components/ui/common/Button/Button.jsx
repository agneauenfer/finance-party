import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import "./button.css";

function Button({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  to = null,          
  href = null,         
  external = false,
  smooth = true 
}) {
  const className = `btn btn--${variant}`
  const isExternalUrl = to && (to.startsWith('http://') || to.startsWith('https://'))

  if (href || external || isExternalUrl) {
    return (
      <a 
        href={href || to} 
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  if (to && to.includes('#')) {
    return (
      <HashLink 
        smooth={smooth}
        to={to} 
        className={className}
      >
        {children}
      </HashLink>
    )
  }

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default Button