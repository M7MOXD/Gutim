import React from 'react';

export default function AdminFooter() {
  return (
    <React.Fragment>
      {/* Main Footer */}
      <footer className="main-footer">
        <strong className="text-success">
          All rights reserved &copy; 2022
        </strong>
        <div className="float-right d-none d-sm-inline-block">
          <b>Gutim</b>
        </div>
      </footer>
    </React.Fragment>
  );
}
