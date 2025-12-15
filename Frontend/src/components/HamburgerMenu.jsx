import { useState, useEffect, useRef } from 'react';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="hamburger" ref={menuRef}>
      <button className="btn btn-secondary" onClick={() => setOpen(!open)}>☰</button>
      {open && (
        <ul className={`hamburger-menu ${open ? 'show' : ''}`}>
          <li>Profile</li>
          <li>Notifications</li>
          <li>Settings</li>
          <li onClick={() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            window.location.reload();
          }} className="logout-item">Logout</li>
        </ul>
      )}
    </div>
  );
}
