import { Logo } from "@/components/ui/logo"

/**
 * Logo Examples and Best Practices
 * 
 * This component demonstrates proper usage of the Logo component
 * across different contexts and sizes.
 */

export function LogoExamples() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">Logo Component Examples</h1>
      
      {/* Size Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Size Variants</h2>
        <div className="flex items-end gap-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center space-y-2">
            <Logo size="xs" />
            <p className="text-xs text-gray-600">xs</p>
          </div>
          <div className="text-center space-y-2">
            <Logo size="sm" />
            <p className="text-xs text-gray-600">sm</p>
          </div>
          <div className="text-center space-y-2">
            <Logo size="md" />
            <p className="text-xs text-gray-600">md (default)</p>
          </div>
          <div className="text-center space-y-2">
            <Logo size="lg" />
            <p className="text-xs text-gray-600">lg</p>
          </div>
          <div className="text-center space-y-2">
            <Logo size="xl" />
            <p className="text-xs text-gray-600">xl</p>
          </div>
          <div className="text-center space-y-2">
            <Logo size="2xl" />
            <p className="text-xs text-gray-600">2xl</p>
          </div>
        </div>
      </section>

      {/* Usage Recommendations */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Recommended Usage</h2>
        <div className="grid gap-4">
          
          {/* Header Usage */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Header/Navigation (size="lg")</h3>
            <div className="bg-white border-b p-4 rounded">
              <div className="flex items-center justify-between">
                <Logo size="lg" variant="link" />
                <div className="text-sm text-gray-600">Navigation items...</div>
              </div>
            </div>
            <pre className="text-xs bg-gray-100 p-2 mt-2 rounded">
{`<Logo size="lg" variant="link" priority={true} />`}
            </pre>
          </div>

          {/* Mobile Header */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Mobile Header (size="md")</h3>
            <div className="bg-white border-b p-3 rounded max-w-sm">
              <div className="flex items-center justify-between">
                <Logo size="md" variant="link" />
                <div className="text-xs text-gray-600">Menu</div>
              </div>
            </div>
            <pre className="text-xs bg-gray-100 p-2 mt-2 rounded">
{`<Logo size="md" variant="link" />`}
            </pre>
          </div>

          {/* Footer Usage */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Footer (size="sm")</h3>
            <div className="bg-gray-900 text-white p-4 rounded">
              <div className="flex items-center gap-4">
                <Logo size="sm" className="brightness-0 invert" />
                <div className="text-xs">© 2024 SkillMap. All rights reserved.</div>
              </div>
            </div>
            <pre className="text-xs bg-gray-100 p-2 mt-2 rounded">
{`<Logo size="sm" className="brightness-0 invert" />`}
            </pre>
          </div>

          {/* Hero Section */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Hero Section (size="2xl")</h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded text-center">
              <Logo size="2xl" className="mx-auto mb-4" />
              <div className="text-sm text-gray-600">Welcome to SkillMap</div>
            </div>
            <pre className="text-xs bg-gray-100 p-2 mt-2 rounded">
{`<Logo size="2xl" className="mx-auto" />`}
            </pre>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Best Practices</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
          <h3 className="font-medium text-blue-900">✅ Do:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use `variant="link"` for clickable logos that navigate to home</li>
            <li>• Set `priority={true}` for above-the-fold logos (improves loading)</li>
            <li>• Use consistent sizes across similar contexts</li>
            <li>• Add appropriate hover effects with className</li>
            <li>• Use responsive sizes (built into the component)</li>
          </ul>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
          <h3 className="font-medium text-red-900">❌ Don't:</h3>
          <ul className="text-sm text-red-800 space-y-1">
            <li>• Use raw Image components for the logo</li>
            <li>• Set fixed pixel sizes that don't respond to screen size</li>
            <li>• Forget to set priority for important logos</li>
            <li>• Use inconsistent sizes across similar pages</li>
            <li>• Override the aspect ratio or object-fit</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
