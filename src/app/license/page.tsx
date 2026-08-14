import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";

export const metadata: Metadata = {
  title: "Alpha Evaluation License",
  description: "The proprietary Mosaic Alpha Evaluation License for personal and internal commercial evaluation.",
  alternates: { canonical: "/license" },
};

export default function LicensePage() {
  return (
    <LegalShell kicker="Mosaic Alpha Evaluation License v1.0" title="Alpha evaluation license">
      <p>Copyright © 2026 Matheus Leal. All rights reserved.</p>
      <p>This license applies to the Mosaic alpha application and its accompanying binary distributions and documentation (collectively, the <strong>Software</strong>). The Software is proprietary and is not open source.</p>
      <h2>1. Evaluation license</h2>
      <p>Subject to this license, you are granted a limited, revocable, non-exclusive, non-transferable, non-sublicensable, royalty-free license to install and use the Software for personal evaluation or internal commercial evaluation. Commercial evaluation includes using Mosaic internally to assess it or to plan products that may be used commercially. It does not include selling, licensing, redistributing, or providing the Software to third parties as a hosted or managed service.</p>
      <h2>2. Restrictions</h2>
      <p>You may not, and may not permit another person or entity to:</p>
      <ol><li>copy the Software except for a reasonable backup copy needed for your permitted use;</li><li>distribute, publish, upload, transmit, sell, rent, lease, sublicense, or otherwise make the Software available to any third party;</li><li>reverse engineer, decompile, disassemble, translate, modify, or attempt to derive the Software’s source code, algorithms, or non-public interfaces, except only to the extent a restriction is prohibited by applicable law;</li><li>remove, alter, or obscure copyright, trademark, license, or other proprietary notices; or</li><li>use the Software in violation of applicable law or to infringe another party’s rights.</li></ol>
      <p>No rights are granted by implication. Mosaic and all associated intellectual property remain the property of the copyright holder and its licensors.</p>
      <h2>3. Third-party services</h2>
      <p>The Software may interoperate with third-party products or services, including Codex. Those products and services are provided under their own terms, privacy policies, availability, and usage limits. They are not included in this license.</p>
      <h2>4. Alpha software</h2>
      <p>The Software is an early alpha release. It may be incomplete, contain errors, change without notice, or lose or corrupt data. You are responsible for reviewing generated artifacts and maintaining appropriate backups. The Software is not intended for safety-critical use or as the sole basis for production, legal, financial, security, or compliance decisions.</p>
      <h2>5. Disclaimer of warranties</h2>
      <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SOFTWARE IS PROVIDED AS IS AND AS AVAILABLE, WITH ALL FAULTS AND WITHOUT WARRANTIES OF ANY KIND, EXPRESS, IMPLIED, OR STATUTORY.</strong> The copyright holder disclaims all warranties, including merchantability, fitness for a particular purpose, title, non-infringement, accuracy, quiet enjoyment, and that the Software will be secure, error-free, or uninterrupted.</p>
      <h2>6. Limitation of liability</h2>
      <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COPYRIGHT HOLDER AND ITS LICENSORS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF DATA, PROFITS, REVENUE, BUSINESS, GOODWILL, OR USE, ARISING FROM OR RELATED TO THE SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</strong> To the maximum extent permitted by law, total liability arising from or related to the Software will not exceed the amount you paid for the Software during the twelve months before the event giving rise to the claim.</p>
      <p>Some jurisdictions do not allow certain warranty exclusions or liability limitations, so portions of these sections may not apply to you.</p>
      <h2>7. Termination</h2>
      <p>This license terminates automatically if you breach it. Upon termination, you must stop using the Software and delete all copies in your possession or control. Sections 2 through 7 survive termination.</p>
      <div className="mosaic-legal-callout"><strong>Acceptance</strong><p>By downloading, installing, or using the Software, you agree to this license. If you do not agree, do not download, install, or use it.</p></div>
    </LegalShell>
  );
}
