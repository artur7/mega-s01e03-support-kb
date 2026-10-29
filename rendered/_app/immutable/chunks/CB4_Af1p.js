import{c as w,a as l,f as u,t as y}from"./YNlEefk5.js";import{R as T}from"./BsaqQObK.js";import{k as _,g,n as x,F as m,aM as R,q as d,_ as $,o as j,$ as C,t as D,a0 as A}from"./DPciju4_.js";import{i as I,l as S,s as P}from"./MWthDWDF.js";import{C as M}from"./BWHQQnfI.js";import{C as B,Q as E}from"./DU3RLw4S.js";import{D as O}from"./DxAdcwNw.js";import{s as Y}from"./k_hu4blQ.js";const q="0123456789ABCDEFGHJKMNPQRSTVWXYZ";function b(o,t){let e=t>>>0;for(let s=0;s<o.length;s++)e^=o.charCodeAt(s),e=Math.imul(e,16777619)>>>0;return e}function z(o){const t=o.trim(),e=b(t,2166136261),s=b(t,2654435769);let c=BigInt(e)<<8n|BigInt(s&255),r="";for(let i=0;i<8;i++)r=q[Number(c&31n)]+r,c>>=5n;return`DR-${r.slice(0,4)}-${r.slice(4)}`}var H=u('<p class="stamp svelte-1280m42">desk ref <b class="svelte-1280m42"> </b></p>'),F=u(`<p class="stamp missing svelte-1280m42">no desk ref: this page isn't signed (no <code>signature</code> in its frontmatter)</p>`);function J(o,t){_(t,!0);const e=R(()=>t.signature?z(t.signature):null);var s=w(),c=g(s);{var r=a=>{var n=H(),p=d($(n)),h=j(p,!0);C(n),D(()=>Y(h,m(e))),l(a,n)},i=a=>{var n=F();l(a,n)};I(c,a=>{m(e)?a(r):a(i,-1)})}l(o,s),x()}const f={layout:"runbook",title:"0002 · Separate the causes hidden in #4471",owner:"artur7",status:"proposed",reviewed:"2026-10-29T00:00:00.000Z",signature:"artur7 / Copilot",supersedes:"/kb/decisions/0001-dedupe-by-subject"},{layout:se,title:re,owner:ae,status:oe,reviewed:ne,signature:Q,supersedes:ie}=f;var W=u(`<h2>What the desk should know</h2> <p>The <a href="/kb/incidents/4471">original incident page</a> says that one parser fix covers
every report. Its rendered cause table contradicts that claim. The export
contains two distinct mechanisms, so the desk needs separate tickets and
resolutions.</p> <p>The public tickets are <a href="https://github.com/artur7/mega-s01e03-support-kb/issues/1" rel="nofollow">shared date parser</a> and <a href="https://github.com/artur7/mega-s01e03-support-kb/issues/2" rel="nofollow">booking-v3 date hint</a>.</p> <!> <h2>Engineering update after the initial review</h2> <p>The <a href="https://hq.mega.dev/challenges/what-it-shows" rel="nofollow">course desk update</a> reports
that #4471 closed on 5 October:</p> <ul><li>The parser was fixed: <code>fix(dates): parse dd/mm for eu locales</code>.</li> <li>The hint was marked <strong>won’t fix</strong> because the booking-v3 form was retired.</li></ul> <p>The parser ticket is therefore completed; the hint ticket is not planned.
Retiring the form is not evidence that its hint was repaired. These are reported
engineering outcomes, not fixes independently tested against production by this
review. The historical allocation and anomalous report bodies below remain
visible; the update does not establish a separate cause for those bodies.</p> <h2>Counts from the export</h2> <p>The table below runs the exported classification code. Reports are deduplicated
by report ID before filtering to ticket #4471. Classification uses the tenant’s
locale, booking-form version and report channel; browser locale, intake tags and
matching subjects are not proof of cause.</p> <!> <h3>Shared date parser</h3> <p>The shared parser treats input as month first even when the tenant writes day
first. An app or email report from a day-first tenant belongs here; a form report
using booking-v2 does too. For example, Harbour Dental’s app report R-41200 says
that 7 April became 4 July.</p> <p>The parser issue should establish an explicit input-date contract and verify
day/month handling across affected locales and channels. It must not be closed
just because the booking-v3 hint is corrected.</p> <h3>Booking-v3 date hint</h3> <p>Booking-v3 prints <code>MM/DD/YYYY</code>, but its form reads the input in the tenant’s
day-first order. A person following the hint therefore gets a different date.
These are form reports from Alder Physio, Copper Studio and Pale Harbour.
R-41230 is an example: Copper Studio uses booking-v3 and <code>es-ES</code>, despite the
report’s <code>en-GB</code> browser locale and <code>parser</code> intake tag.</p> <p>The hint issue should make the displayed format match the form’s actual input
contract and verify that following the hint preserves the intended date.
Changing only the shared parser does not resolve this separate UI contract.</p> <h3>Reports requiring follow-up</h3> <p>The table’s one-day-move footnote is evidence of uncertainty, not a confirmed
third cause. The desk notes identify R-41202, R-41209, R-41236, R-41344 and R-41620.
Their bodies describe one-day or temporal anomalies, but the exported classifier
places them under parser from tenant and channel alone.</p> <p>Keep that limitation visible on the parser ticket. Ask for the original input,
expected and actual dates, timezone and processing trace before asserting a
timezone bug or changing the allocation. Do not silently drop these reports or
double-count them in another ticket.</p> <h2>When the reports arrived</h2> <!> <p>The received and merged bars are different events. Reports arrived before the
July merge backlog was processed and continued afterwards. A merge spike does
not establish an arrival spike, a new regression date or a completed fix.</p> <h2>Proposed replacement for subject-only merging</h2> <p>This is a new decision record. The accepted <a href="/kb/decisions/0001-dedupe-by-subject">decision 0001</a> is preserved unchanged.
On acceptance, use this record instead of the old <a href="/kb/triage/dedupe">subject-only triage rule</a>.</p> <ol><li>Read the report body and look up its tenant, locale, form version and channel.</li> <li>Compare the observed failure and mechanism with the candidate ticket.</li> <li>Merge only when the evidence supports the same cause. Matching subjects alone
are insufficient; different subjects alone do not rule out a duplicate.</li> <li>If the tenant is unknown, the evidence conflicts or the mechanism is unclear,
keep the report separate and request the missing facts.</li> <li>Count each report ID once. Preserve report IDs, receipt times and merge times
so another reviewer can reproduce the split.</li></ol> <!> <p>The explorer illustrates both directions: the same subject can hide different
causes, and different subjects can describe the same cause. Its classifications
are evidence from this export, not a substitute for reading anomalous reports.</p> <h2>Source of the findings</h2> <p>The export’s <code>src/lib/kb/causes.ts</code> defines the classifier and deduplication. <code>src/lib/kb/locales.ts</code> resolves tenants from <code>src/lib/data/tenants/</code>. <code>src/lib/data/reports-4471.json</code> contains the reports, and <code>src/lib/data/desk-notes.json</code> identifies the anomalous bodies.
The rendered tables and chart above run that code rather than copying the
original incident page’s prose.</p> <!>`,1);function G(o,t){const e=S(t,["children","$$slots","$$events","$$legacy"]);T(o,P(()=>e,()=>f,{children:(s,c)=>{var r=W(),i=d(g(r),6);M(i,{children:(v,K)=>{A();var k=y(`This is a review of the export dated 4 October 2026, not a live view of the desk.
The desk can receive and merge more reports while this review is being written.
The proposed rule below replaces decision 0001 only after the desk accepts it.`);l(v,k)},$$slots:{default:!0}});var a=d(i,14);B(a,{ticket:4471});var n=d(a,22);E(n,{ticket:4471});var p=d(n,10);O(p,{});var h=d(p,8);J(h,{get signature(){return Q}}),l(s,r)},$$slots:{default:!0}}))}const de=Object.freeze(Object.defineProperty({__proto__:null,default:G,metadata:f},Symbol.toStringTag,{value:"Module"}));export{de as _,G as a};
