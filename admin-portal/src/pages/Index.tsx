// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        {/* Indian Flag Header */}
        <div className="bg-gradient-patriot rounded-2xl p-8 text-white shadow-saffron">
          <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🇮🇳</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Naagrik Sampark Admin Portal</h1>
          <p className="text-white/90">Digital India Initiative</p>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome to the Government Portal
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            This is a comprehensive civic complaint management system that connects citizens 
            with government departments for efficient resolution of civic issues.
          </p>
        </div>

        {/* Access Buttons */}
        <div className="space-y-4">
          <a 
            href="/admin/login"
            className="block w-full bg-gradient-saffron hover:bg-saffron-dark text-white font-medium py-3 px-6 rounded-lg transition-smooth shadow-saffron"
          >
            🏛️ Official Admin Access
          </a>
          
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">👥 <strong>For Citizens:</strong> Use the mobile app to report civic issues</p>
            <p>🏢 <strong>For Officials:</strong> Use the admin dashboard above</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Made with 🧡 for Digital India • Secure Government Portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
