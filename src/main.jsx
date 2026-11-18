import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Activity, ArrowLeft, ArrowRight, ArrowUpRight, Bell, Bookmark, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Download, Eye, Flame, Flag, Heart, House, LayoutDashboard, LogIn, MapPin, Menu, MessageCircle, MessageSquare, Search, Share2, ShieldCheck, Trophy, UserRound, Users, Utensils, X } from 'lucide-react';
import { Notiflix, reportError, withLoading } from './feedback';
import './styles.css';

const photos = {
  hero: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=88',
  cooking: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85',
  spices: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=85',
  meal: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85',
  chef: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=85',
  dosa: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=85',
  kitchen: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1000&q=85',
  featureA: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
  featureB: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85',
  featureC: 'https://www.baps.org/Data/Sites/1/Media/GalleryImages/16384/WebImages/BAPS_Cooking_Competitions_Melbourne_22.jpg',
  featureD: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=900&q=85',
  prize: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=85',
  registration: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85',
  organizerLogin: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=85',
  participantLogin: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=85',
  house: '/house-grand-prize.png',
};
const heroVideos = [
  'https://videos.pexels.com/video-files/854216/854216-hd_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/8626681/8626681-hd_1920_1080_25fps.mp4',
];

const sampleParticipants = [
  { id:'TZ-TNV-0248', name:'Shiva', dish:'Kothu Parotta', district:'Tirunelveli', area:'Palayamkottai', stage:'Finalist', score:94, initials:'SH' },
  { id:'TZ-TNV-0231', name:'Karthik S.', dish:'Nellai Sodhi', district:'Tirunelveli', area:'Tirunelveli Town', stage:'Round 2', score:89, initials:'KS' },
  { id:'TZ-TNV-0219', name:'Fathima B.', dish:'Paalkova', district:'Tirunelveli', area:'Melapalayam', stage:'Round 2', score:87, initials:'FB' },
  { id:'TZ-TNV-0197', name:'Arun Kumar', dish:'Country Chicken Gravy', district:'Tirunelveli', area:'Ambasamudram', stage:'Audition', score:81, initials:'AK' },
];
const liveItems = [
  ['10:42 AM','Audition check-in opened','Batch A · 24 of 32 participants checked in for the current audition batch.','bg-emerald-500'],
  ['10:18 AM','Judge scores submitted','Round 1 · 8 scorecards received','bg-blue-500'],
  ['09:55 AM','Schedule updated','Live cook-off starts at 11:30 AM','bg-amber-500'],
];
const districtNames = ['Tirunelveli','Tenkasi','Thoothukudi','Madurai','Chennai','Coimbatore','Salem','Thanjavur','Dindigul','Tiruppur','Erode','Vellore'];

function confirmWorkspaceExit(go) {
  Notiflix.Confirm.show('Leave this workspace?', 'You can return to Thezar event site and sign in again at any time.', 'Leave', 'Stay', () => go('home'));
}

function openPublicSection(go, sectionId) {
  go('home');
  window.setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' }), 80);
}

const districtRounds = [
  {
    title: 'Home Cooking Challenge',
    task: 'Prepare one everyday dish of your choice.',
    details: ['Choose breakfast, lunch, dinner or a snack you already know.', 'Show your regular cooking skills; no mystery box or professional challenge.', 'Judges taste each dish and select the cooks moving forward.'],
    from: 100, to: 60,
    criteria: [['Taste',40],['Presentation',15],['Cooking method',20],['Hygiene',15],['Creativity',10]],
  },
  {
    title: 'Family Meal Challenge',
    task: 'Prepare a simple, balanced family meal.',
    details: ['Serve a main dish with suitable side dishes.', 'Balance flavours across the meal and finish within the given time.', 'Judges evaluate the complete meal, not just one dish.'],
    from: 60, to: 30,
    criteria: [['Taste and flavour',35],['Meal combination',20],['Cooking skills',20],['Presentation',15],['Hygiene and time management',10]],
  },
  {
    title: 'Given Ingredients Challenge',
    task: 'Create a dish using ingredients supplied by the organisers.',
    details: ['Every cook receives the same set of basic ingredients.', 'Choose your own dish, making sure to use the compulsory main ingredients.', 'Show how creatively and effectively you use what is provided.'],
    from: 30, to: 10,
    criteria: [['Taste',35],['Creativity',25],['Ingredient utilisation',20],['Presentation',10],['Hygiene and time management',10]],
  },
  {
    title: 'Tirunelveli District Grand Cook-Off',
    task: 'Prepare your best special meal.',
    details: ['The top 10 cooks choose their own menu.', 'Prepare a complete meal within the allotted time.', 'The highest-scoring cook becomes Tirunelveli’s district winner and represents the district in Chennai.'],
    from: 10, to: 1,
    criteria: [['Taste',35],['Cooking technique',20],['Menu combination',15],['Presentation',15],['Creativity',10],['Hygiene',5]],
  },
];

const finaleCategories = [
  {
    name: 'Traditional Cuisine Masters',
    objective: 'Traditional cooking, authentic recipes and the food heritage of Tamil Nadu.',
    advantage: 'Golden Ingredient Pass',
    advantageDetail: 'The Level 3 winner chooses ingredients first from the available baskets in Category 2.',
    rounds: [
      { title: 'Heritage Recipe Challenge', task: 'Prepare a traditional dish from any region of Tamil Nadu.', details: ['Choose a traditional recipe and use authentic ingredients and methods.', 'Explain the history or speciality of your dish.', 'Judges assess both authenticity and taste.'], from:38, to:30, criteria:[['Taste',35],['Authenticity',25],['Cooking technique',20],['Presentation',10],['Hygiene',10]] },
      { title: "Grandma’s Secret Recipe", task: 'Recreate a traditional dish from clues and a reference sample.', details: ['Study the judges’ dish by its appearance and a tasting sample.', 'Use the recipe clues to reproduce its taste, texture and consistency.', 'Judges compare your preparation with the reference dish.'], from:30, to:24, criteria:[['Taste accuracy',35],['Recipe understanding',20],['Texture and consistency',15],['Cooking technique',20],['Presentation and hygiene',10]] },
      { title: 'Royal Heritage Feast', task: 'Prepare a complete traditional feast.', details: ['Serve a main dish with suitable side dishes.', 'Demonstrate thoughtful meal combinations and traditional techniques.', 'Judges evaluate the full feast.'], from:24, to:18, criteria:[['Overall taste',35],['Authenticity',20],['Menu combination',15],['Cooking skills',15],['Presentation',10],['Hygiene',5]] },
    ],
  },
  {
    name: 'Vegetarian Culinary Masters',
    objective: 'Vegetarian cooking, ingredient management and creativity.',
    advantage: 'Mystery Ingredient Swap Pass',
    advantageDetail: 'The Level 3 winner may exchange one compulsory mystery ingredient in Category 3 for an ingredient from an approved list.',
    rounds: [
      { title: 'Vegetable Basket Challenge', task: 'Create a dish using a basket of vegetables.', details: ['Everyone receives the same basket and must use its compulsory vegetables.', 'Add permitted basic ingredients and choose your own recipe.', 'Transform simple vegetables into an attractive, flavourful dish.'], from:18, to:14, criteria:[['Taste',35],['Creativity',20],['Vegetable utilisation',20],['Cooking technique',15],['Presentation and hygiene',10]] },
      { title: 'Zero-Waste Cooking Challenge', task: 'Make a meal using the ingredients provided with minimum wastage.', details: ['Use vegetables, stems, leaves and other usable ingredients creatively.', 'Unnecessary wastage reduces your score.', 'The finished meal must still be tasty and properly prepared.'], from:14, to:10, criteria:[['Taste',30],['Ingredient utilisation',25],['Creativity',15],['Cooking technique',15],['Presentation',10],['Hygiene',5]] },
      { title: 'Vegetarian Restaurant Challenge', task: 'Prepare a three-course vegetarian restaurant menu.', details: ['Prepare a starter, main course and dessert.', 'Make the three dishes complement one another.', 'Manage the clock and deliver a complete restaurant-style experience.'], from:10, to:8, criteria:[['Taste',30],['Menu combination',20],['Cooking technique',20],['Creativity',10],['Presentation',15],['Hygiene',5]] },
    ],
  },
  {
    name: 'Non-Vegetarian Royal Feast',
    objective: 'Meat preparation, seafood handling, spice balance and advanced cooking skills.',
    advantage: 'Royal Time Pass',
    advantageDetail: 'The Level 3 winner receives 10 additional minutes for the next Category 4 challenge.',
    rounds: [
      { title: 'Spice Master Challenge', task: 'Prepare a non-vegetarian dish with balanced spices.', details: ['Work with a selection of spices and a compulsory main ingredient.', 'Choose an appropriate cooking method.', 'Show balanced flavour, aroma and texture—not simply excessive heat.'], from:8, to:6, criteria:[['Taste and spice balance',35],['Cooking technique',25],['Texture and doneness',15],['Creativity',10],['Presentation',10],['Hygiene',5]] },
      { title: 'Seafood Special Challenge', task: 'Prepare a special seafood dish.', details: ['Clean and prepare the supplied fish or seafood correctly.', 'Choose a suitable recipe and cooking technique.', 'Judges assess freshness, texture, flavour and cooking accuracy.'], from:6, to:5, criteria:[['Taste',30],['Seafood preparation',20],['Cooking accuracy',20],['Flavour balance',15],['Presentation',10],['Hygiene',5]] },
      { title: 'Royal Non-Veg Platter', task: 'Prepare a grand non-vegetarian platter.', details: ['Serve a main dish with two suitable accompaniments.', 'Demonstrate different cooking techniques.', 'Make the dishes work together as one complete platter.'], from:5, to:4, criteria:[['Taste',30],['Cooking technique',20],['Platter combination',20],['Texture and doneness',10],['Presentation',15],['Hygiene',5]] },
    ],
  },
  {
    name: 'Creative Culinary Masters',
    objective: 'Innovation, professional cooking, presentation and all-round culinary talent.',
    advantage: 'The Grand Champion title',
    advantageDetail: 'The Level 3 winner becomes Thezar Tamil Nadu Royal Chef and receives the house prize, subject to the published prize conditions.',
    rounds: [
      { title: 'Fusion Food Challenge', task: 'Create a new dish combining two different cuisines.', details: ['Work with two cuisine themes and combine their styles or ingredients.', 'Give the final dish a clear, unique identity.', 'Judges assess whether the fusion works in both taste and presentation.'], from:4, to:3, criteria:[['Taste',30],['Fusion creativity',25],['Cooking technique',20],['Presentation',15],['Concept explanation',5],['Hygiene',5]] },
      { title: "Chef’s Replication Challenge", task: 'Recreate a professional chef’s signature dish.', details: ['Watch a guest chef demonstrate a special dish.', 'Recreate its taste, texture and presentation as closely as possible.', 'Judges compare your dish with the chef’s reference.'], from:3, to:2, criteria:[['Taste accuracy',30],['Technique',25],['Texture and consistency',15],['Presentation',15],['Timing',10],['Hygiene',5]] },
      { title: 'Ultimate Master Chef Challenge', task: 'Prepare a complete three-course grand finale meal.', details: ['The final two cooks design their own starter, main course and dessert.', 'Manage several dishes at the same time.', 'The highest total score wins the Tamil Nadu championship and grand prize.'], from:2, to:1, criteria:[['Overall taste',35],['Cooking technique',20],['Menu planning and balance',15],['Creativity',10],['Presentation',15],['Hygiene and time management',5]] },
    ],
  },
];

function App() {
  const [view,setView] = useState('home');
  const [adminTab,setAdminTab] = useState('Overview');
  const [menuOpen,setMenuOpen] = useState(false);
  const [query,setQuery] = useState('');
  const [faq,setFaq] = useState(0);
  const [participant,setParticipant] = useState({name:'Shiva',phone:'',district:'Tirunelveli',age:'',dish:'Kothu Parotta'});
  const [loginName,setLoginName] = useState('');
  const [organizerRole,setOrganizerRole] = useState('Event organizer');
  const go = next => { setView(next); setMenuOpen(false); window.scrollTo({top:0,behavior:'smooth'}); };
  const openAdmin = tab => { setAdminTab(tab); go('admin'); };
  const matching = sampleParticipants.filter(p => `${p.name} ${p.id} ${p.dish} ${p.district} ${p.area} ${p.stage}`.toLowerCase().includes(query.toLowerCase()));

  if (view === 'register') return <RegistrationPage go={go} participant={participant} setParticipant={setParticipant}/>;
  if (view === 'role-choice') return <RoleChoicePage go={go}/>;
  if (view === 'organizer-register') return <OrganizerRegistrationPage go={go} initialRole={organizerRole} onContinue={setOrganizerRole}/>;
  if (view === 'organizer-login') return <RoleLogin go={go} role="organizer" loginName={loginName} setLoginName={setLoginName} organizerRole={organizerRole} setOrganizerRole={setOrganizerRole} onContinue={()=>{setAdminTab('Overview');go('organizer-dashboard')}}/>;
  if (view === 'participant-login') return <RoleLogin go={go} role="participant" loginName={loginName} setLoginName={setLoginName} onContinue={()=>go('participant')}/>;
  if (view === 'participant') return <ParticipantRoleDashboard go={go} participant={participant}/>;
  if (view === 'admin') return <AdminDashboard go={go} activeTab={adminTab} setActiveTab={setAdminTab} query={query} setQuery={setQuery} participants={matching}/>;
  if (view === 'organizer-dashboard') return organizerRole==='Event organizer'
    ? <AdminDashboard go={go} activeTab={adminTab} setActiveTab={setAdminTab} query={query} setQuery={setQuery} participants={matching}/>
    : <RoleOperationsDashboard go={go} role={organizerRole}/>;

  return <PublicSite go={go} menuOpen={menuOpen} setMenuOpen={setMenuOpen} faq={faq} setFaq={setFaq} openAdmin={openAdmin}/>;
}

function Brand({light=false,onClick,goldMark=false}) {
  return <button onClick={onClick} className="flex items-center gap-2.5 text-left"><span className={`grid h-11 w-11 place-items-center rounded-sm ${goldMark?'bg-[#d5a33a] text-[#172f50]':'bg-[#d62732] text-white'}`}><Flame size={23} strokeWidth={2.2}/></span><span><b className={`block text-[17px] font-extrabold tracking-[.14em] ${light?'text-white':'text-[#183b68]'}`}>THEZAR</b><small className={`mt-0.5 block text-[7px] tracking-[.15em] ${light?'text-white/65':'text-[#7d8997]'}`}>TALENT ACROSS TAMIL NADU</small></span></button>;
}

function PublicSite({go,menuOpen,setMenuOpen,faq,setFaq,openAdmin}) {
  const [heroVideoIndex,setHeroVideoIndex] = useState(0);
  const faqs=[['Who can take part?','Home cooks and aspiring chefs from Tirunelveli are welcome. Participants under 18 can join with a parent or guardian.'],['Do I need professional experience?','No. Bring the dish you are proud of—family recipes, local favourites and new ideas are all welcome.'],['When is the competition?','The date and venue will be announced. Register your interest to receive the confirmed schedule.'],['How do I track my application?','Use the Participant Login to open your personal competition view and follow your updates.']];
  return <div className="public-premium min-h-screen bg-[#f3ead8] text-[#202c40]">
    <header className="relative z-30 border-b border-[#dfd2bd] bg-[#fff9ed]"><div className="mx-auto flex min-h-[74px] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-8"><Brand light goldMark onClick={()=>go('home')}/><button onClick={()=>setMenuOpen(!menuOpen)} className="border border-[#d7c9b1] p-2 text-white md:hidden" aria-label="Open site navigation">{menuOpen?<X size={18}/>:<Menu size={18}/>}</button><nav className={`${menuOpen?'absolute left-0 right-0 top-full flex flex-col border-b border-[#d9ceb9] bg-[#fff9ed] px-5 py-4 shadow-lg':'hidden'} gap-5 text-[10px] font-bold uppercase tracking-[.08em] text-[#324863] md:static md:flex md:flex-row md:items-center md:bg-transparent md:p-0 md:shadow-none`}><a onClick={()=>setMenuOpen(false)} href="#event">Home</a><a onClick={()=>setMenuOpen(false)} href="#about">The Event</a><a onClick={()=>setMenuOpen(false)} href="#rounds">Competition</a><a onClick={()=>setMenuOpen(false)} href="#highlights">Highlights</a><a onClick={()=>setMenuOpen(false)} href="#faq">FAQs</a><button onClick={()=>go('role-choice')} className="bg-[#c62432] px-4 py-3 text-left text-[9px] font-extrabold tracking-[.08em] text-white hover:bg-[#a51d2b]">REGISTER NOW <ArrowUpRight size={13} className="ml-2 inline"/></button></nav></div></header>

    <main>
      <section id="event" className="relative isolate overflow-hidden bg-[#183b68] text-white"><video key={heroVideoIndex} className="absolute inset-0 -z-20 h-full w-full object-cover" autoPlay muted playsInline preload="auto" onEnded={()=>setHeroVideoIndex(index=>(index+1)%heroVideos.length)} aria-label="Cooking video background"><source src={heroVideos[heroVideoIndex]} type="video/mp4"/></video><div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102c50]/65 via-[#15375f]/35 to-transparent"/><div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#132a48]/25 via-transparent to-transparent"/>
        <div className="mx-auto grid min-h-[520px] max-w-[1400px] items-center gap-8 px-5 py-12 sm:px-8 lg:min-h-[570px] lg:grid-cols-[1.15fr_.85fr] lg:px-14"><div><div className="mb-4 inline-flex items-center gap-2 bg-[#c62432] px-3 py-2 text-[8px] font-extrabold tracking-[.16em] sm:text-[9px]">THEZAR PRESENTS <span className="text-white/60">·</span> COOK-OFF 01 / 38</div><p className="font-tamil text-base text-[#ffdc8c]">நெல்லை சமையல் திருவிழா</p><h1 className="mt-2 max-w-2xl text-[2.45rem] font-extrabold leading-[1.04] tracking-[-.035em] sm:text-5xl lg:text-[3.65rem]">Tirunelveli’s Home Chef<br/><span className="text-[#ffd26b]">Championship 2026</span></h1><p className="mt-4 max-w-xl text-sm leading-6 text-white/85">A celebration of home cooks, local flavours and recipes passed from one generation to the next. Your kitchen story deserves a bigger stage.</p><div className="mt-6 flex flex-wrap gap-3"><button onClick={()=>go('register')} className="flex h-11 items-center gap-4 bg-[#c62432] px-5 text-[10px] font-extrabold uppercase tracking-wide hover:bg-[#a51d2b]">Register as a contestant <ArrowRight size={15}/></button><button onClick={()=>go('participant-login')} className="flex h-11 items-center gap-2 border border-white/60 bg-white/5 px-4 text-[10px] font-bold uppercase tracking-wide hover:bg-white hover:text-[#183b68]">Participant Login <UserRound size={14}/></button></div><p className="mt-5 font-tamil text-[11px] text-[#f6e7c4]">சுவை நம்ம ஊரு. மேடை நம்மது.</p></div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3"><div className="relative col-span-2 h-36 overflow-hidden border-4 border-white/75 sm:h-44"><img src={photos.meal} alt="Colourful South Indian meal" className="h-full w-full object-cover"/><span className="absolute bottom-0 left-0 bg-[#c62432] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[.12em]">A celebration of Tamil flavours</span></div><div className="relative h-28 overflow-hidden border-4 border-white/75 sm:h-32"><img src={photos.spices} alt="Fresh spices" className="h-full w-full object-cover"/><span className="absolute bottom-0 left-0 bg-[#d7a53f] px-2 py-1 text-[7px] font-bold uppercase text-[#183b68]">Local ingredients</span></div><div className="relative h-28 overflow-hidden border-4 border-white/75 sm:h-32"><img src={photos.cooking} alt="Home cook in the kitchen" className="h-full w-full object-cover"/><span className="absolute bottom-0 left-0 bg-[#183b68] px-2 py-1 text-[7px] font-bold uppercase">Real home cooks</span></div></div>
        </div>
      </section>

      <section className="border-b-4 border-[#d6a53c] bg-[#fff8e9]"><div className="mx-auto grid max-w-[1400px] grid-cols-2 sm:px-8 md:grid-cols-4">{[[CalendarDays,'DATES','To be announced'],[MapPin,'VENUE','Tirunelveli, Tamil Nadu'],[Utensils,'CATEGORY','Cooking · District round'],[Trophy,'FINALE','Chennai']].map(([Icon,label,value],i)=><div key={label} className={`flex min-h-[74px] items-center gap-2.5 border-[#e4d7c2] px-3 py-3 sm:gap-3 sm:px-5 ${i%2===0?'border-r':''} ${i<2?'border-b md:border-b-0':''} ${i===2?'md:border-l':''}`}><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eee2ca] text-[#c62432] sm:h-9 sm:w-9"><Icon size={16}/></span><span><small className="block text-[7px] font-extrabold tracking-[.16em] text-[#8e806c]">{label}</small><b className="mt-1 block text-[10px] text-[#34465d] sm:text-xs">{value}</b></span></div>)}</div></section>

      <SponsorRail/>

      <section id="about" className="about-section">
        <div className="about-layout">
          <div className="about-copy">
            <p className="section-eyebrow">ABOUT THEZAR <span>TAMIL NADU</span></p>
            <h2>A stage for the flavours that feel like home.</h2>
            <p className="about-tamil font-tamil">ஒவ்வொரு வீட்டிலும் ஒரு சிறப்பான ருசி.</p>
            <p className="about-description">Thezar celebrates the recipes and flavours passed down across Tamil Nadu. Beginning in Tirunelveli, it gives people a stage to share a dish they know and love.</p>
            <div className="about-pillars">
              <div><Users size={17}/><span><b>For home cooks</b><small>No professional experience needed</small></span></div>
              <div><MapPin size={17}/><span><b>38 districts</b><small>One winner from each district</small></span></div>
              <div><Trophy size={17}/><span><b>Chennai grand finale</b><small>District winners meet on one stage</small></span></div>
            </div>
            <button onClick={()=>go('register')} className="about-cta">Join the competition <ArrowRight size={15}/></button>
          </div>
          <div className="about-gallery">
            <figure className="about-gallery-main"><img src={photos.kitchen} alt="A home cook preparing a meal"/><figcaption><span>01</span> Where every great recipe begins</figcaption></figure>
            <figure><img src={photos.dosa} alt="A traditional South Indian dish"/><figcaption>Local favourites</figcaption></figure>
            <figure><img src={photos.chef} alt="A chef carefully plating a dish"/><figcaption>New talent, big stage</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="thezar-explainer thezar-film-only" aria-label="Thezar film">
        <div className="thezar-explainer-layout">
          <figure className="thezar-film">
            <div className="thezar-film-top">
              <a className="thezar-film-account" href="#about"><span className="thezar-film-avatar"><Flame size={17}/></span><span><b>thezar.official</b><small>Original audio</small></span></a>
              <a className="thezar-film-profile-link" href="#about">View profile</a>
            </div>
            
            <video controls playsInline preload="metadata" poster={photos.cooking} aria-label="Sample cooking film introducing Thezar">
              <source src={heroVideos[0]} type="video/mp4"/>
              Your browser does not support embedded video.
            </video>
            <div className="thezar-film-actions" aria-hidden="true">
              <span><Heart size={24}/><MessageCircle size={24}/><Share2 size={23}/></span>
              <Bookmark size={24}/>
            </div>
          </figure>
        </div>
      </section>

      <section id="highlights" className="bg-[#183b68] px-5 py-14 text-white sm:px-8 sm:py-16"><div className="mx-auto max-w-[1400px]"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[9px] font-extrabold tracking-[.16em] text-[#ffd36c]">THE EXPERIENCE</p><h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">More than a cook-off.</h2></div><p className="max-w-sm text-xs leading-5 text-white/70">A gathering built around food, friendly competition and the people who make it memorable.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[[photos.featureA,'01 / THE COOKS','Home cooks take centre stage'],[photos.featureB,'02 / THE FLAVOUR','Celebrate the region’s food traditions'],[photos.featureC,'03 / THE JUDGES','Expert eyes, thoughtful scoring'],[photos.featureD,'04 / THE FINALE','District winners head to Chennai']].map(([src,label,title])=><article key={label} className="group relative h-52 overflow-hidden border-4 border-white/90"><img src={src} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-[#111e31]/85 via-[#111e31]/10 to-transparent"/><div className="absolute inset-x-0 bottom-0 border-t-2 border-[#d5a33a] bg-[#112d51]/95 px-3 py-2.5"><span className="text-[8px] font-extrabold tracking-[.14em] text-[#ffd36c]">{label}</span><h3 className="mt-1 text-xs font-bold text-white sm:text-sm">{title}</h3></div></article>)}</div></div></section>

      <section id="rounds" className="bg-[#f3ead8] px-5 py-14 sm:px-8 sm:py-16"><div className="mx-auto max-w-[1400px]"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[9px] font-bold tracking-[.14em] text-[#c62432]">THE COMPETITION</p><h2 className="mt-3 text-3xl font-bold text-[#183b68] sm:text-4xl">From first dish to district champion</h2></div><button onClick={()=>go('register')} className="self-start bg-[#d5a33a] px-4 py-3 text-[9px] font-extrabold uppercase text-[#183b68] hover:bg-[#c62432] hover:text-white">How to take part <ArrowRight size={13} className="ml-2 inline"/></button></div><div className="competition-overview-grid mt-7">{[[CalendarDays,'01','Online registration','Share your details, district and signature dish.'],[ShieldCheck,'02','Participant selection','Receive your audition information from our team.'],[Utensils,'03','District cook-off','Cook live, meet the judges and earn your place.'],[Trophy,'04','Chennai grand finale','District champions come together for the final.']].map(([Icon,n,title,body])=><article key={n} className="competition-overview-card"><div className="overview-card-top"><span className="overview-step">STEP {n} <i>/ 04</i></span><span className="overview-icon"><Icon size={21} strokeWidth={1.8}/></span></div><h3>{title}</h3><p>{body}</p><ArrowUpRight className="overview-card-arrow" size={18}/></article>)}</div></div></section>

      <CompetitionJourney/>
      <HousePrize go={go}/>

      <section className="premium-updates border-y border-[#c7a96c] bg-[#f1e8d8] px-5 py-12 sm:px-8 sm:py-14"><div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-14 lg:px-6"><div className="border-l-4 border-[#c62432] pl-5 sm:pl-7"><p className="text-[9px] font-extrabold tracking-[.16em] text-[#c62432]">THEZAR · TIRUNELVELI</p><h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#183b68] sm:text-4xl">Event updates</h2><p className="mt-3 max-w-md text-xs leading-6 text-[#647389]">Schedules, audition details and results will be posted here as they are confirmed. Registered contestants will also receive important updates directly.</p><button onClick={()=>go('participant-login')} className="mt-5 flex items-center gap-2 border-b border-[#183b68] pb-1 text-[10px] font-extrabold uppercase tracking-wide text-[#183b68] hover:text-[#c62432]">Open contestant portal <ArrowRight size={14}/></button></div><div className="grid gap-3">{[['01','REGISTRATION','Entries are opening soon','Register your interest to receive the first announcement.','OPENING SOON'],['02','AUDITIONS','Tirunelveli audition schedule','The confirmed date, venue and reporting time will be sent to participants.','TO BE CONFIRMED'],['03','FINALE','The road to Chennai','The district winner will advance to Thezar’s grand finale.','DISTRICT ROUND']].map(([n,tag,title,body,status],i)=><article key={tag} className={`grid grid-cols-[38px_1fr] gap-3 border border-[#c9c0b0] border-l-4 bg-[#fffaf1] p-4 sm:grid-cols-[42px_1fr_auto] sm:items-center sm:gap-4 sm:px-5 ${i===1?'border-l-[#c62432]':'border-l-[#183b68]'}`}><span className="grid h-9 w-9 place-items-center border border-[#d8cfbf] text-[9px] font-bold text-[#7a8795]">{n}</span><div><p className="text-[8px] font-extrabold tracking-[.12em] text-[#a24a42]">{tag}</p><h3 className="mt-1 text-[11px] font-bold text-[#263f5f]">{title}</h3><p className="mt-1 text-[9px] leading-5 text-[#6f7d8e]">{body}</p></div><span className="col-start-2 mt-1 w-fit border border-[#d8cfbf] px-2 py-1 text-[7px] font-bold tracking-wide text-[#65758a] sm:col-start-auto sm:mt-0">{status}</span></article>)}</div></div></section>

      <section className="premium-faq bg-[#fffaf1] px-5 py-12 sm:px-8 sm:py-14"><div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-12 lg:px-6"><div className="flex flex-col justify-between gap-6 bg-[#183b68] p-5 text-white sm:p-7"><div><p className="text-[9px] font-extrabold tracking-[.16em] text-[#ffd36c]">HELP & INFORMATION</p><h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">Before you join us.</h2><p className="mt-3 max-w-sm text-xs leading-6 text-white/75">Answers for contestants and families taking part in the Tirunelveli cooking competition.</p></div><p className="font-tamil text-sm text-[#ffdc8c]">உதவி மற்றும் தகவல்</p></div><div className="border border-[#cbbda6] bg-white px-5 sm:px-7">{faqs.map(([q,a],i)=><div key={q} className="border-b border-[#d8cfbf] last:border-0"><button onClick={()=>setFaq(faq===i?-1:i)} className="flex w-full items-center justify-between gap-4 py-5 text-left text-[11px] font-bold text-[#263f5f]"><span>{q}</span><ChevronDown size={16} className={`shrink-0 text-[#c62432] transition ${faq===i?'rotate-180':''}`}/></button>{faq===i&&<p className="mb-5 border-l-2 border-[#c62432] bg-[#f7f5f0] px-4 py-3 text-[10px] leading-6 text-[#647389]">{a}</p>}</div>)}</div></div></section>
    </main>
    <footer id="contact" className="bg-[#112d51] px-5 py-7 text-white sm:px-8"><div className="mx-auto flex max-w-[1400px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><Brand light onClick={()=>go('home')}/><p className="font-tamil text-xs text-white/75">நெல்லையில் சந்திப்போம்.<small className="mt-1 block text-[9px] text-white/45">See you in Tirunelveli.</small></p><div className="flex gap-4 text-[9px] font-semibold text-white/70"><button onClick={()=>go('participant-login')}>Participant login</button><button onClick={()=>go('organizer-login')}>Organizer access</button></div></div><div className="mx-auto mt-6 max-w-[1400px] border-t border-white/15 pt-3 text-[8px] tracking-wide text-white/40">© 2026 THEZAR · ALL RIGHTS RESERVED</div></footer>
  </div>;
}

function SponsorRail() {
  const logos = [
    ['title','TITLE PARTNER'],
    ['food','FOOD PARTNER'],
    ['kitchen','KITCHEN PARTNER'],
    ['culinary','CULINARY PARTNER'],
    ['media','MEDIA PARTNER'],
    ['support','SUPPORTING PARTNER'],
  ];
  const logoImage = (kind,role) => {
    const icons={
      title:'<path d="M33 53h34l-4-17-10 8-8-17-7 17-10-8zM29 59h42M36 64h28"/><circle cx="34" cy="31" r="2" fill="#c5a04b" stroke="none"/><circle cx="67" cy="31" r="2" fill="#c5a04b" stroke="none"/>',
      food:'<path d="M30 51h40c-2 11-9 16-20 16s-18-5-20-16zM35 48c1-9 7-14 15-14s14 5 15 14M25 32v16M20 32v9M30 32v9M76 31c-6 5-8 12-8 20M76 31v37"/>',
      kitchen:'<path d="M30 42h42v20H30zM26 42h50M35 36c0-4 4-7 8-7 2-8 16-8 18 0 5 0 8 3 8 7M37 62v5M65 62v5M48 49h7"/>',
      culinary:'<path d="M30 40c-8-10 2-20 11-15 2-11 20-11 22 0 10-4 18 7 10 15v5H30zM34 45h35v20H34zM42 52h19M42 58h14"/>',
      media:'<path d="m30 34 38-8 4 17-38 8zM35 50v17M66 43l3 24M40 57h24M42 34l7 13M55 31l7 13"/><circle cx="35" cy="29" r="2"/><circle cx="48" cy="26" r="2"/><circle cx="61" cy="23" r="2"/>',
      support:'<path d="M50 65 31 48c-10-10 3-25 15-14l4 4 4-4c12-11 25 4 15 14zM25 36l-6-5M75 36l6-5M24 52h-7M76 52h7"/>',
    };
    const artwork = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" fill="#183b68"/><circle cx="50" cy="50" r="43" fill="#fff8e9" stroke="#c5a04b" stroke-width="1.5"/><circle cx="50" cy="50" r="38" fill="none" stroke="#183b68" stroke-width="1.5" stroke-dasharray="1.5 2.5"/><path d="M20 25 23 28M77 28l3-3" stroke="#a77e32" stroke-width="2"/><circle cx="50" cy="50" r="27" fill="#f3ead8" stroke="#c5a04b" stroke-width="1.5"/><g fill="none" stroke="#183b68" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">${icons[kind]}</g><circle cx="50" cy="50" r="34" fill="none" stroke="#c5a04b" stroke-width=".8"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(artwork)}`;
  };
  return <section className="overflow-hidden border-b border-[#dfe3e9] bg-white py-4 sm:py-5"><div className="mx-auto mb-3 flex max-w-[1360px] flex-col justify-between gap-1 px-5 sm:flex-row sm:items-end sm:px-8"><div><p className="text-[8px] font-bold tracking-[.13em] text-[#9a493a]">EVENT PARTNERS</p><h2 className="mt-1 text-xs font-bold text-[#33465e]">Supporting the Tirunelveli cook-off</h2></div><p className="text-[8px] text-[#7d8795]">Partner names will be announced as they are confirmed.</p></div><div className="sponsor-window group overflow-hidden"><div className="sponsor-track flex w-max gap-2 px-2">{[...logos,...logos].map(([kind,role],i)=><div key={`${role}-${i}`} aria-hidden={i>=logos.length} className="flex h-[104px] w-[240px] items-center gap-3 border-r border-[#e2e6eb] bg-white px-4 sm:w-[270px]"><img className="partner-logo h-[76px] w-[76px] shrink-0" src={logoImage(kind,role)} alt={`${role.toLowerCase()} badge`} /><span><b className="block text-[10px] font-bold tracking-[.08em] text-[#53637a]">{role}</b><small className="mt-1 block text-[9px] text-[#929ba7]">THEZAR EVENT PARTNER</small></span></div>)}</div></div></section>;
}

function RoundCard({round,index}) {
  const [viewOpen,setViewOpen] = useState(false);
  const totalMarks = round.criteria.reduce((total,[,marks])=>total+marks,0);
  return <article className="challenge-card">
    <div className="challenge-summary">
      <span className="challenge-number">{String(index+1).padStart(2,'0')}</span>
      <span className="challenge-heading"><b>{round.title}</b><small>{round.task}</small></span>
    </div>
    <button type="button" className="challenge-view" onClick={()=>setViewOpen(true)} aria-label={`View ${round.title} details`}>View round <ArrowUpRight size={14}/></button>
    {viewOpen&&createPortal(<div className="challenge-modal-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget)setViewOpen(false)}}>
      <section className="challenge-modal" role="dialog" aria-modal="true" aria-labelledby={`round-title-${index}`}>
        <div className="challenge-modal-head"><div><p className="competition-eyebrow">ROUND {String(index+1).padStart(2,'0')}</p><h3 id={`round-title-${index}`}>{round.title}</h3><p>{round.task}</p></div><button type="button" className="challenge-modal-close" aria-label="Close round details" onClick={()=>setViewOpen(false)}><X size={19}/></button></div>
        <div className="challenge-content">
          <div className="challenge-explanation"><h4>The challenge</h4><ul>{round.details.map(detail=><li key={detail}>{detail}</li>)}</ul></div>
          <div className="challenge-scoring"><div className="scoring-heading"><h4>Judging criteria</h4><span>{totalMarks} marks</span></div>
            {round.criteria.map(([label,marks])=><div className="criterion" key={label}><div><span>{label}</span><b>{marks}</b></div><span className="criterion-track"><span style={{width:`${marks}%`}}/></span></div>)}
          </div>
        </div>
      </section>
    </div>,document.body)}
  </article>;
}

function CompetitionJourney() {
  const [stage,setStage] = useState('district');
  return <section id="competition-plan" className="competition-journey">
    <div className="competition-container">
      <div className="competition-intro">
        <div className="competition-intro-label"><span><Utensils size={18}/></span><div><p className="competition-eyebrow">THE FULL COMPETITION FORMAT</p><small>From local kitchens to the Chennai Grand Finale</small></div></div>
        <h2>One district at a time.<br/><span>One champion for Tamil Nadu.</span></h2>
        <p>A welcoming start for everyday home cooks, followed by a progressive championship where skill, flavour and creativity decide who advances.</p>
        <div className="competition-snapshot">
          <div><MapPin size={17}/><span><b>38 districts</b><small>One winner from each</small></span></div>
          <div><Utensils size={17}/><span><b>12 finale levels</b><small>Four culinary categories</small></span></div>
          <div><House size={17}/><span><b>A home in Chennai</b><small>The Grand Champion’s prize</small></span></div>
        </div>
      </div>
      <div className="competition-tabs" role="group" aria-label="Competition stages">
        <button type="button" aria-pressed={stage==='district'} onClick={()=>{setStage('district');Notiflix.Notify.info('District round format selected.');}}><span className="stage-number">01</span><b>District rounds</b><small>4 rounds · welcoming start</small></button>
        <button type="button" aria-pressed={stage==='chennai'} onClick={()=>{setStage('chennai');Notiflix.Notify.info('Chennai grand finale format selected.');}}><span className="stage-number">02</span><b>Chennai grand finale</b><small>4 categories · 12 levels</small></button>
      </div>
      {stage==='district'?<div role="tabpanel" className="competition-stage district-stage">
        <div className="stage-heading"><div><p className="competition-eyebrow">PART 1 · DISTRICT MASTER CHEF CHALLENGE</p><h3>Tirunelveli district rounds</h3><p>The same four-round format is repeated across all 38 districts.</p></div><span className="stage-count"><b>100</b> cooks <ArrowRight size={14}/> <b>01</b> district winner</span></div>
        <div className="district-content-panel">
          <div className="district-rules"><ShieldCheck size={19}/><p><b>Start with what you know.</b> Everyone follows the same rules in Tirunelveli—there are no special advantages in any district. The opening round is familiar home cooking, not a professional challenge.</p></div>
          <div className="round-list">{districtRounds.map((round,index)=><RoundCard key={round.title} round={round} index={index}/>)}</div>
          <p className="format-note">Proposed contestant counts · Tirunelveli winner advances as one of 38 district representatives.</p>
        </div>
      </div>:<div role="tabpanel" className="competition-stage finale-stage">
        <div className="stage-heading"><div><p className="competition-eyebrow">PART 2 · TAMIL NADU GRAND CHAMPIONSHIP</p><h3>38 district winners. One shared journey.</h3><p>The same contestants progress through each category; they are never split into separate groups.</p></div><span className="stage-count"><b>38</b> finalists <ArrowRight size={14}/> Chennai</span></div>
        <div className="category-list">{finaleCategories.map((category,index)=><article className="finale-category" key={category.name}>
          <div className="category-heading"><span className="category-index">0{index+1}</span><div><p>CATEGORY <span className="category-number">{String(index+1).padStart(2,'0')}</span></p><h4>{category.name}</h4><small>{category.objective}</small></div></div>
          <div className="category-advantage"><Trophy size={17}/><p><b>{category.advantage}</b><span>{category.advantageDetail}</span></p><span className="advantage-label">{index===3?'THE PRIZE':'CATEGORY ADVANTAGE'}</span></div>
          <div className="round-list">{category.rounds.map((round,roundIndex)=><RoundCard key={round.title} round={round} index={roundIndex}/>)}</div>
        </article>)}</div>
        <p className="format-note">Proposed elimination structure · Scores determine who advances at every level; an advantage never guarantees qualification.</p>
      </div>}
      <div className="judging-panel"><div><p className="competition-eyebrow">ONE FAIR STANDARD</p><h3>How judging works</h3><p>Every round is scored out of 100 using the criteria shown above.</p></div><ul><li>Announce the challenge and scoring criteria before cooking begins.</li><li>Use the same ingredient quantities and time limits for contestants in the same round.</li><li>At least three judges score independently; record each score and calculate the total.</li><li>Eliminate based on the lowest total. For a tie, the higher taste score is the first tie-breaker.</li></ul></div>
    </div>
  </section>;
}

function HousePrize({go}) {
  return <section className="house-prize">
    <div className="house-prize-copy"><p className="competition-eyebrow">THE GRAND PRIZE · CHENNAI</p><p className="house-kicker">38 DISTRICTS <span>·</span> 1 ROYAL CHEF <span>·</span> 1 HOME</p><h2>A home for<br/><span>Tamil Nadu’s</span><br/>Grand Champion.</h2><p>The final cook standing earns the title <b>Thezar Tamil Nadu Royal Chef</b>—and the grand prize of a house in Chennai.</p><button type="button" onClick={()=>go('register')}>Start your journey <ArrowRight size={16}/></button><small>Prize property subject to availability, ownership and the published written award terms.</small></div>
    <div className="house-prize-image"><img src={photos.house} alt="Modern two-storey home representing the Chennai grand prize"/><span><House size={16}/> THEZAR ROYAL CHEF · GRAND PRIZE</span></div>
  </section>;
}

function RegistrationPage({go,participant,setParticipant}) {
  const set = key => event => setParticipant(current=>({...current,[key]:event.target.value}));
  return <div className="min-h-screen bg-[#173b67] px-3 py-4 sm:px-8 sm:py-10">
    <main className="relative mx-auto max-w-5xl overflow-hidden border-4 border-[#d5a33a] bg-[#fff8e9] shadow-2xl lg:grid lg:grid-cols-[1fr_.9fr]">
      <button onClick={()=>go('home')} aria-label="Back to public event website" className="absolute right-3 top-3 z-20 flex items-center gap-2 bg-[#183b68] p-2 text-[8px] font-bold text-white shadow-md transition hover:bg-[#102a4a] sm:right-4 sm:top-4 sm:px-3 sm:py-2"><ArrowLeft size={13}/><span className="hidden sm:inline">Back to public event website</span></button>
      <div className="relative min-h-[280px] overflow-hidden lg:min-h-[620px]">
        <img src={photos.registration} alt="Home cook preparing a dish" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#102a4a]/90 via-[#102a4a]/20 to-transparent"/>
        <div className="absolute left-4 top-4 sm:left-5 sm:top-5"><Brand light goldMark onClick={()=>go('home')}/></div>
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-[8px] font-extrabold tracking-[.16em] text-[#ffd36c]">TIRUNELVELI COOK-OFF 2026</p>
          <h1 className="mt-2 text-3xl font-extrabold">Your recipe belongs on this stage.</h1>
          <p className="mt-2 max-w-sm text-[10px] leading-5 text-white/75">Tell us about yourself and the dish you want to bring to the cook-off.</p>
        </div>
      </div>
      <section className="p-6 sm:p-9 lg:self-center">
        <p className="text-[8px] font-extrabold tracking-[.16em] text-[#c62432]">FIRST DISTRICT EDITION · 01 / 38</p>
        <h2 className="mt-2 text-2xl font-extrabold text-[#183b68]">Participant registration</h2>
        <p className="mt-2 text-[10px] leading-5 text-[#758091]">Enter your details to preview the contestant flow. No information is saved.</p>
        <form onSubmit={e=>{e.preventDefault();try{go('participant');Notiflix.Report.info('Registration preview ready',`Welcome ${participant.name.trim()}. Your contestant portal is open. This preview does not submit or save an application.`,'Continue');}catch(error){reportError(error,'We could not open the contestant portal.');}}} className="mt-5 space-y-3">
          <label className="block text-[9px] font-bold">Full name<input required value={participant.name} onChange={set('name')} placeholder="Participant name" className="mt-1.5 block h-10 w-full border border-[#ded2bc] bg-white px-3 text-[10px] outline-none focus:border-[#c62432]"/></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-[9px] font-bold">Mobile number<input required type="tel" value={participant.phone} onChange={set('phone')} placeholder="Mobile number" className="mt-1.5 block h-10 w-full border border-[#ded2bc] bg-white px-3 text-[10px] outline-none focus:border-[#c62432]"/></label>
            <label className="block text-[9px] font-bold">Age<input required type="number" min="1" max="120" value={participant.age} onChange={set('age')} placeholder="Age" className="mt-1.5 block h-10 w-full border border-[#ded2bc] bg-white px-3 text-[10px] outline-none focus:border-[#c62432]"/></label>
          </div>
          <label className="block text-[9px] font-bold">District<select value={participant.district} onChange={set('district')} className="mt-1.5 block h-10 w-full border border-[#ded2bc] bg-white px-3 text-[10px]"><option>Tirunelveli</option><option>Tenkasi</option><option>Thoothukudi</option><option>Other Tamil Nadu district</option></select></label>
          <label className="block text-[9px] font-bold">Signature dish<input required value={participant.dish} onChange={set('dish')} placeholder="Dish you would like to cook" className="mt-1.5 block h-10 w-full border border-[#ded2bc] bg-white px-3 text-[10px] outline-none focus:border-[#c62432]"/></label>
          <button type="submit" className="flex h-11 w-full items-center justify-center gap-3 bg-[#c62432] text-[9px] font-extrabold uppercase tracking-wide text-white hover:bg-[#a51d2b]">Continue to contestant portal <ArrowRight size={14}/></button>
        </form>
      </section>
    </main>
  </div>;
}

function RoleChoicePage({go}) {
  const roles=[
    {key:'participant',icon:UserRound,title:'I’m a participant',copy:'Register for the cook-off or check your contestant journey.',action:'Participant sign in'},
    {key:'organizer',icon:ShieldCheck,title:'I’m an organizer',copy:'Access event tools or create an organizer account.',action:'Organizer sign in'},
  ];
  return <div className="min-h-screen bg-[#101f35] px-4 py-6 sm:px-8 sm:py-10">
    <main className="mx-auto max-w-4xl border-4 border-[#c5a66a] bg-[#fffdf8] shadow-2xl">
      <RoleHeader go={go} label="CHOOSE YOUR THEZAR SPACE"/>
      <section className="px-5 py-10 sm:px-10 sm:py-14">
        <p className="text-center text-[9px] font-extrabold tracking-[.17em] text-[#96733b]">WELCOME TO THEZAR</p>
        <h1 className="mt-2 text-center text-3xl font-bold text-[#183b68] sm:text-4xl">How are you joining us?</h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-6 text-[#6f7b8b]">Choose your role to continue to the right sign-in and registration options.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {roles.map(({key,icon:Icon,title,copy,action})=><article key={key} className="border border-[#d6c59f] border-t-4 border-t-[#b99550] bg-[#f7f2e8] p-5 sm:p-7">
            <span className="grid h-12 w-12 place-items-center border border-[#c9ad70] bg-[#eee4ce] text-[#80602d]"><Icon size={22}/></span>
            <h2 className="mt-5 text-xl font-bold text-[#183b68]">{title}</h2>
            <p className="mt-2 min-h-12 text-sm leading-6 text-[#6f7b8b]">{copy}</p>
            <button type="button" onClick={()=>go(`${key}-login`)} className="mt-5 flex w-full items-center justify-center gap-2 bg-[#183b68] px-4 py-3 text-sm font-bold text-white hover:bg-[#244b6d]">{action}<ArrowRight size={16}/></button>
          </article>)}
        </div>
      </section>
    </main>
  </div>;
}

function OrganizerRegistrationPage({go,initialRole,onContinue}) {
  const [details,setDetails]=useState({name:'',email:'',phone:'',role:initialRole});
  const update=key=>event=>setDetails(current=>({...current,[key]:event.target.value}));
  return <div className="min-h-screen bg-[#101f35] px-3 py-4 sm:px-8 sm:py-10">
    <main className="relative mx-auto max-w-5xl overflow-hidden border-4 border-[#c5a66a] bg-[#fffdf8] shadow-2xl lg:grid lg:grid-cols-[1fr_.9fr]">
      <button onClick={()=>go('organizer-login')} aria-label="Back to organizer sign in" className="absolute right-3 top-3 z-20 flex items-center gap-2 bg-[#183b68] p-2 text-[8px] font-bold text-white shadow-md sm:right-4 sm:top-4 sm:px-3 sm:py-2"><ArrowLeft size={13}/><span className="hidden sm:inline">Back to organizer sign in</span></button>
      <div className="relative min-h-[280px] overflow-hidden lg:min-h-[620px]">
        <img src={photos.organizerLogin} alt="Thezar event organizer coordinating a cooking event" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#102a4a]/90 via-[#102a4a]/20 to-transparent"/>
        <div className="absolute left-4 top-4 sm:left-5 sm:top-5"><Brand light goldMark onClick={()=>go('home')}/></div>
        <div className="absolute bottom-6 left-6 right-6 text-white"><p className="text-[8px] font-extrabold tracking-[.16em] text-[#ffd36c]">THEZAR · EVENT TEAM</p><h1 className="mt-2 text-3xl font-extrabold">Help bring every round to life.</h1><p className="mt-2 max-w-sm text-[10px] leading-5 text-white/75">Create an organizer profile to help coordinate the Tirunelveli cook-off.</p></div>
      </div>
      <section className="p-6 sm:p-9 lg:self-center">
        <p className="text-[8px] font-extrabold tracking-[.16em] text-[#96733b]">ORGANIZER ACCESS</p>
        <h2 className="mt-2 text-2xl font-extrabold text-[#183b68]">Create your profile</h2>
        <p className="mt-2 text-[10px] leading-5 text-[#758091]">Enter your details to preview organizer registration. No information is saved.</p>
        <form onSubmit={event=>{event.preventDefault();try{onContinue(details.role);go('organizer-login');Notiflix.Report.info('Organizer profile preview ready',`Your ${details.role.toLowerCase()} sign-in is ready. This preview does not submit or save an account.`,'Continue');}catch(error){reportError(error,'We could not continue to organizer sign-in.');}}} className="mt-5 space-y-3">
          <label className="block text-[9px] font-bold">Full name<input required value={details.name} onChange={update('name')} placeholder="Your name" className="mt-1.5 block h-10 w-full border border-[#ded2bc] bg-white px-3 text-[10px] outline-none focus:border-[#b99550]"/></label>
          <label className="block text-[9px] font-bold">Work email<input required type="email" value={details.email} onChange={update('email')} placeholder="name@example.com" className="mt-1.5 block h-10 w-full border border-[#ded2bc] bg-white px-3 text-[10px] outline-none focus:border-[#b99550]"/></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-[9px] font-bold">Mobile number<input required type="tel" value={details.phone} onChange={update('phone')} placeholder="Phone number" className="mt-1.5 block h-10 w-full border border-[#ded2bc] bg-white px-3 text-[10px] outline-none focus:border-[#b99550]"/></label>
            <label className="block text-[9px] font-bold">Your role<select value={details.role} onChange={update('role')} className="mt-1.5 block h-10 w-full border border-[#ded2bc] bg-white px-3 text-[10px]"><option>Event organizer</option><option>District coordinator</option><option>Judge</option><option>Volunteer</option></select></label>
          </div>
          <button type="submit" className="flex h-11 w-full items-center justify-center gap-3 bg-[#183b68] text-[9px] font-extrabold uppercase tracking-wide text-white hover:bg-[#244b6d]">Continue to organizer sign in <ArrowRight size={14}/></button>
        </form>
      </section>
    </main>
  </div>;
}

function RoleHeader({go,label}) { return <header className="border-b border-[#ddcfb8] bg-[#fff9ed] px-4 py-3 sm:px-8 sm:py-4"><div className="mx-auto flex max-w-6xl items-center justify-between gap-3"><Brand goldMark onClick={()=>go('home')}/><span className="hidden text-[8px] font-extrabold tracking-[.16em] text-[#9a493a] sm:block">{label}</span><button onClick={()=>go('home')} className="flex shrink-0 items-center gap-1.5 border border-[#c5a66a] bg-[#183b68] px-2.5 py-2 text-[10px] font-bold text-white shadow-sm transition hover:bg-[#244b6d] sm:gap-2 sm:px-3 sm:py-2.5"><ArrowLeft size={14}/> <span>Event site</span></button></div></header>; }

function RoleLogin({go,role,loginName,setLoginName,onContinue,organizerRole,setOrganizerRole}) {
  const organizer=role==='organizer';
  return <div className="min-h-screen bg-[#173b67] px-3 py-4 sm:px-8 sm:py-10">
    <div className="relative mx-auto max-w-5xl overflow-hidden border-4 border-[#d5a33a] bg-[#fff8e9] shadow-2xl lg:grid lg:grid-cols-[1fr_.9fr]">
      <button onClick={()=>go('home')} aria-label="Back to public event website" className="absolute right-3 top-3 z-20 flex items-center gap-2 bg-[#183b68] p-2 text-[8px] font-bold text-white shadow-md transition hover:bg-[#102a4a] sm:right-4 sm:top-4 sm:px-3 sm:py-2"><ArrowLeft size={13}/><span className="hidden sm:inline">Back to public event website</span></button>
      <div className="relative min-h-[280px] overflow-hidden lg:min-h-[560px]">
        <img src={organizer?photos.organizerLogin:photos.participantLogin} alt="Thezar cooking event" className="absolute inset-0 h-full w-full object-cover"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#102a4a]/90 via-[#102a4a]/20 to-transparent"/>
        <div className="absolute left-4 top-4 sm:left-5 sm:top-5"><Brand light goldMark onClick={()=>go('home')}/></div>
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-[8px] font-extrabold tracking-[.16em] text-[#ffd36c]">TIRUNELVELI COOK-OFF 2026</p>
          <h1 className="mt-2 text-3xl font-extrabold">{organizer?'Organizer access':'Your contestant space'}</h1>
          <p className="mt-2 max-w-sm text-[10px] leading-5 text-white/75">{organizer?'Manage the district event, registrations and competition activity.':'Check your schedule, competition progress, scores and announcements.'}</p>
        </div>
      </div>
      <section className="p-6 sm:p-10 lg:self-center">
        <p className="text-[8px] font-extrabold tracking-[.16em] text-[#c62432]">ROLE-SPECIFIC SIGN IN</p>
        <h2 className="mt-2 text-2xl font-extrabold text-[#183b68]">{organizer?`${organizerRole} sign in`:'Participant sign in'}</h2>
        <p className="mt-2 text-[10px] leading-5 text-[#758091]">This is a UI preview. Enter anything to continue to the {organizer?`${organizerRole.toLowerCase()} workspace`:'contestant'} view.</p>
        <form onSubmit={e=>{e.preventDefault();try{onContinue();Notiflix.Report.info(organizer?'Workspace preview opened':'Contestant portal opened',`This is a local UI preview; no credentials were verified. ${organizer?`${organizerRole} workspace`:'Contestant portal'} is now displayed.`,'Continue');}catch(error){reportError(error,'We could not open this workspace.');}}} className="mt-6 space-y-3">
          {organizer&&<label className="block text-[9px] font-bold">Organizer role<select value={organizerRole} onChange={e=>setOrganizerRole(e.target.value)} className="mt-1.5 h-11 w-full border border-[#ded2bc] bg-white px-3 text-[10px]"><option>Event organizer</option><option>District coordinator</option><option>Judge</option><option>Volunteer</option></select></label>}
          <label className="block text-[9px] font-bold">{organizer?'Organizer email or name':'Participant ID or mobile number'}<input required value={loginName} onChange={e=>setLoginName(e.target.value)} placeholder={organizer?'Enter any name or email':'Enter any participant ID or number'} className="mt-1.5 h-11 w-full border border-[#ded2bc] bg-white px-3 text-[10px] outline-none focus:border-[#c62432]"/></label>
          {organizer&&<label className="block text-[9px] font-bold">Password<input required type="password" placeholder="Enter anything" className="mt-1.5 h-11 w-full border border-[#ded2bc] bg-white px-3 text-[10px] outline-none focus:border-[#c62432]"/></label>}
          <button type="submit" className="flex h-11 w-full items-center justify-center gap-2 bg-[#c62432] text-[9px] font-extrabold uppercase tracking-wide text-white hover:bg-[#a51d2b]">Continue <ArrowRight size={14}/></button>
        </form>
        <div className="mt-5 border-t border-[#e4dac9] pt-4 text-center">
          <p className="text-[9px] text-[#7c8795]">{organizer?'New to the organizer team?':'New to the competition?'}</p>
          <button onClick={()=>go(organizer?'organizer-register':'register')} className="mt-2 text-[9px] font-extrabold text-[#183b68] underline underline-offset-2">{organizer?'Create an organizer profile':'Register as a participant'}</button>
          <div className="mt-3"><button onClick={()=>go('role-choice')} className="text-[8px] font-bold text-[#7c8795] underline underline-offset-2">Choose a different role</button></div>
        </div>
      </section>
    </div>
  </div>;
}
function ParticipantRoleDashboard({go,participant}) {
  const name=participant.name||'Contestant';
  const [activeSection,setActiveSection]=useState('Overview');
  const sections=[['Overview',LayoutDashboard],['Application',UserRound],['Competition progress',Activity],['Updates',Bell],['Schedule',CalendarDays],['Leaderboard',Trophy],['Support',MessageSquare]];
  const descriptions={Overview:'Your registration, current round and upcoming event details.',Application:'Your contestant identity and submitted registration details.', 'Competition progress':'Track your journey from registration to the Chennai grand finale.',Updates:'Schedules and announcements for your competition journey.',Schedule:'Review your next event and important timing details.',Leaderboard:'See your current position in the Tirunelveli district.',Support:'Get help with your application or event-day arrangements.'};
  const heroTitle=activeSection==='Overview'?`Welcome, ${name}`:activeSection;
  return <div className="participant-dashboard min-h-screen bg-[#f2f4f7] text-[#293b55]">
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-white/10 bg-[#112f52] px-4 text-white sm:px-8 xl:px-12">
      <Brand light goldMark onClick={()=>go('home')}/>
      <div className="hidden items-center gap-2 text-[10px] font-bold tracking-wide text-white/80 sm:flex"><span className="grid h-8 w-8 place-items-center border border-[#d2b36d]/45 bg-white/5 text-[#e2c77f]"><UserRound size={16}/></span><span>PARTICIPANT<small className="mt-0.5 block text-[9px] font-normal text-white/55">TIRUNELVELI COOK-OFF</small></span></div>
      <div className="flex items-center gap-2"><button onClick={()=>{setActiveSection('Updates');Notiflix.Notify.info('Your event updates are open.');}} className="relative p-2 text-white/80" aria-label="Open updates"><Bell size={17}/><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#ffd36c]"/></button><button onClick={()=>confirmWorkspaceExit(go)} className="flex items-center gap-1.5 border border-white/25 px-2.5 py-2 text-[9px] font-bold text-white/90 hover:bg-white/10 sm:px-3"><ArrowLeft size={13}/> Event site</button></div>
    </header>
    <div className="role-dashboard-layout">
      <aside className="role-dashboard-sidebar"><p className="role-dashboard-sidebar-label">YOUR WORKSPACE</p><div className="role-dashboard-sidebar-role"><span className="role-dashboard-sidebar-icon"><UserRound size={17}/></span><span><b>Participant</b><small>Tirunelveli · Cook-off</small></span></div><nav aria-label="Participant dashboard sections">{sections.map(([label,Icon])=><button type="button" key={label} onClick={()=>setActiveSection(label)} className={activeSection===label?'is-current':''}><Icon size={15}/>{label}</button>)}</nav><div className="role-dashboard-profile"><span className="role-dashboard-profile-avatar">{name.split(/\s+/).map(word=>word[0]).join('').slice(0,2).toUpperCase()}</span><span><b>{name}</b><small>Participant preview</small></span></div></aside>
      <main className="role-dashboard-main">
        <nav className="role-dashboard-mobile-nav" aria-label="Participant dashboard sections">{sections.map(([label,Icon])=><button type="button" key={label} onClick={()=>setActiveSection(label)} className={activeSection===label?'is-current':''}><Icon size={14}/>{label}</button>)}</nav>
        <section className="role-dashboard-hero"><div className="role-dashboard-hero-icon"><UserRound size={24}/></div><div><p>THEZAR · PARTICIPANT</p><h1>{heroTitle}</h1><span>{descriptions[activeSection]}</span></div><span className="role-dashboard-hero-tag"><i/>TIRUNELVELI</span></section>
        {activeSection==='Overview'&&<>
          <div className="role-dashboard-metrics participant-role-metrics">{[[MapPin,'DISTRICT','Tirunelveli'],[Flag,'CURRENT STAGE','District cook-off'],[Trophy,'LATEST SCORE','94 / 100 points'],[CalendarDays,'NEXT MILESTONE','Final schedule']].map(([Icon,label,value])=><article key={label} className="role-dashboard-metric"><span className="participant-metric-icon"><Icon size={18}/></span><div><small>{label}</small><b>{value}</b></div></article>)}</div>
          <section className="role-dashboard-feature-card"><div className="role-dashboard-feature-icon"><UserRound size={21}/></div><div><p className="role-dashboard-panel-kicker">YOUR PARTICIPANT ID</p><h2>TZ-TNV-0248</h2><p>{participant.district||'Tirunelveli'} · Home Chef · Signature dish: {participant.dish||'Kothu Parotta'}</p></div><span className="role-dashboard-feature-count"><b>02</b><small>district position</small></span></section>
        </>}
        {activeSection==='Application'&&<section className="role-dashboard-data-panel"><div className="role-dashboard-data-panel-head"><div><p className="role-dashboard-panel-kicker">CONTESTANT RECORD</p><h2>Application details</h2><p>Registration information shown in this local portal preview.</p></div><span className="role-dashboard-section-count">RECEIVED</span></div><div className="participant-detail-grid">{[['Participant ID','TZ-TNV-0248'],['Full name',name],['Mobile number',participant.phone||'Not provided'],['Age',participant.age||'Not provided'],['District',participant.district||'Tirunelveli'],['Signature dish',participant.dish||'Not provided']].map(([label,value])=><article key={label}><small>{label}</small><b>{value}</b></article>)}</div></section>}
        {activeSection==='Competition progress'&&<section className="role-dashboard-data-panel"><div className="role-dashboard-data-panel-head"><div><p className="role-dashboard-panel-kicker">YOUR COOK-OFF JOURNEY</p><h2>Competition progress</h2><p>Follow each stage from registration through the Chennai grand finale.</p></div></div><div className="participant-progress-list">{[['01','Registration received','Your contestant entry is in the Tirunelveli pilot roster.',true],['02','Audition','The organizing team will share your audition details.',true],['03','District cook-off','You are listed as a district finalist.',true],['04','Chennai grand finale','The district champion advances to the grand finale.',false]].map(([number,title,detail,complete])=><article key={number} className="participant-progress-row"><span className={complete?'is-complete':''}>{complete?<Check size={17}/>:number}</span><div><b>{title}</b><p>{detail}</p></div><small>{complete?'COMPLETE':'UPCOMING'}</small></article>)}</div></section>}
        {activeSection==='Updates'&&<section className="role-dashboard-data-panel"><div className="role-dashboard-data-panel-head"><div><p className="role-dashboard-panel-kicker">THEZAR NOTICES</p><h2>Updates for you</h2><p>Important event notes will appear here as the schedule is confirmed.</p></div><span className="role-dashboard-section-count">2 UPDATES</span></div><div className="participant-update-list">{[['Schedule','We will notify you when the district final date and venue are confirmed.'],['Announcement','Your signature dish will be shared with the judging panel before your round.']].map(([title,body])=><article key={title}><span><Bell size={17}/></span><div><b>{title}</b><p>{body}</p></div></article>)}</div></section>}
        {activeSection==='Schedule'&&<section className="role-dashboard-feature-card"><div className="role-dashboard-feature-icon"><CalendarDays size={21}/></div><div><p className="role-dashboard-panel-kicker">UPCOMING · DATE TO BE CONFIRMED</p><h2>Tirunelveli district final</h2><p>The organizing team will confirm the venue and publish directions here. Check your updates for schedule announcements.</p><button type="button" onClick={()=>openPublicSection(go,'about')} className="participant-dashboard-link-button">View event details <ArrowRight size={15}/></button></div><span className="role-dashboard-feature-count"><b>—</b><small>date pending</small></span></section>}
        {activeSection==='Leaderboard'&&<section className="role-dashboard-data-panel"><div className="role-dashboard-data-panel-head"><div><p className="role-dashboard-panel-kicker">TIRUNELVELI · ROUND 2</p><h2>District leaderboard</h2><p>Current sample standings from the district finalist group.</p></div><Trophy size={20} className="text-[#b99550]"/></div><div className="participant-leaderboard">{[...sampleParticipants].sort((a,b)=>b.score-a.score).map((person,index)=><article key={person.id} className={person.name===name?'is-you':''}><span className="participant-rank">{index+1}</span><div><b>{person.name}{person.name===name?' · You':''}</b><small>{person.dish} · {person.stage}</small></div><strong>{person.score} pts</strong></article>)}</div><p className="participant-sample-note">Standings are sample data for the dashboard preview.</p></section>}
        {activeSection==='Support'&&<section className="role-dashboard-feature-card"><div className="role-dashboard-feature-icon"><MessageSquare size={21}/></div><div><p className="role-dashboard-panel-kicker">CONTESTANT SUPPORT</p><h2>Need help?</h2><p>Questions about your registration, schedule or event-day check-in? Contact the contestant support team.</p><a href="tel:+919876543210" className="participant-dashboard-link-button"><MessageSquare size={15}/> Call participant support</a></div></section>}
      </main>
    </div>
  </div>;
}

function ParticipantPortal({go,participant}) {
  const name=participant.name||'Contestant';
  return <div className="participant-dashboard min-h-screen bg-[#f2f4f7] text-[#293b55]"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#112f52] px-4 text-white sm:px-8 xl:px-12">
    <Brand light goldMark onClick={()=>go('home')}/>
    <div className="hidden items-center gap-2 text-[9px] text-white/70 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/> CONTESTANT PORTAL <span className="mx-2 text-white/25">|</span> <MapPin size={12}/> Tirunelveli</div>
    <div className="flex items-center gap-2">
      <button onClick={()=>{document.getElementById('contestant-updates')?.scrollIntoView({behavior:'smooth'});Notiflix.Notify.info('Showing your latest event updates.');}} className="relative p-2 text-white/80" aria-label="Notifications"><Bell size={17}/><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#ffd36c]"/></button>
      <button onClick={()=>confirmWorkspaceExit(go)} aria-label="Event website" className="flex items-center gap-1.5 border border-white/25 px-2 py-2 text-[8px] font-bold text-white/90 transition hover:bg-white/10 sm:gap-2 sm:px-3"><ArrowLeft size={13}/> <span className="hidden sm:inline">Event website</span></button>
    </div>
  </header>
    <main className="w-full px-4 py-6 sm:px-8 sm:py-8 xl:px-12 2xl:px-16"><section className="role-dashboard-hero participant-dashboard-hero"><span className="role-dashboard-hero-icon"><UserRound size={24}/></span><div><p>CONTESTANT PORTAL · TIRUNELVELI DISTRICT</p><h1>Welcome, {name}</h1><span>Your application status, upcoming round, competition progress and event announcements are all in one place.</span></div><span className="role-dashboard-hero-tag participant-status-tag"><i/>REGISTRATION RECEIVED</span></section>
      <div className="mb-5 grid grid-cols-2 overflow-hidden border border-[#9aa9ba] bg-white shadow-sm sm:grid-cols-4">{[["CURRENT STAGE","District cook-off"],["DISTRICT POSITION","02 · Tirunelveli"],["LATEST SCORE","94 / 100 points"],["NEXT MILESTONE","Final schedule"]].map(([label,value],i)=><div key={label} className={`border-[#d5dde6] px-4 py-4 sm:px-5 ${i%2===0?"border-r":""} ${i<2?"border-b sm:border-b-0":""} ${i===2?"sm:border-l":""}`}><p className="text-[8px] font-bold tracking-wide text-[#77879a]">{label}</p><p className="mt-2 text-sm font-bold text-[#183b68]">{value}</p></div>)}</div>     <div className="grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,.75fr)]"><div className="space-y-5"><section className="relative overflow-hidden border-l-4 border-[#d5a33a] bg-[#183b68] p-5 text-white sm:p-7"><div className="flex justify-between"><div><p className="text-[8px] font-extrabold tracking-[.15em] text-[#ffd36c]">YOUR PARTICIPANT ID</p><p className="mt-2 text-xl font-extrabold">TZ-TNV-0248</p><p className="mt-1 text-[9px] text-white/65">{participant.district||'Tirunelveli'} · Home Chef</p></div><span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><UserRound size={19}/></span></div><div className="mt-5 grid grid-cols-2 border-t border-white/15 pt-4"><div><small className="text-[7px] text-white/55">SIGNATURE DISH</small><p className="mt-1 text-[10px] font-bold">{participant.dish||'Your dish'}</p></div><div><small className="text-[7px] text-white/55">CURRENT ROUND</small><p className="mt-1 text-[10px] font-bold text-[#ffe08b]">District Finalist</p></div></div></section>
        <section className="border border-[#dfe4ec] bg-white p-4"><div className="flex items-center justify-between"><div><h2 className="text-[10px] font-extrabold text-[#344d6b]">Competition progress</h2><p className="mt-1 text-[8px] text-[#8893a2]">Follow each stage from registration through the Chennai grand finale.</p></div><Activity size={16} className="text-[#c62432]"/></div><div className="mt-4 grid grid-cols-4">{[['01','Registered',true],['02','Audition',true],['03','District final',true],['04','Chennai finale',false]].map(([n,label,done],i)=><div key={n} className="relative text-center"><span className={`relative z-10 mx-auto grid h-7 w-7 place-items-center rounded-full text-[8px] font-bold ${done?'bg-emerald-600 text-white':'border border-[#d8dee7] bg-white text-[#99a3b1]'}`}>{done?<Check size={12}/>:n}</span>{i<3&&<span className={`absolute left-1/2 top-3.5 h-px w-full ${i<2?'bg-emerald-500':'bg-[#dfe4eb]'}`}/>}<p className="mt-2 text-[7px] leading-3 text-[#69788d]">{label}</p></div>)}</div></section>
        <section id="contestant-updates" className="border border-[#dfe4ec] bg-white"><div className="flex items-center justify-between border-b border-[#e7ebf0] px-4 py-3"><h2 className="text-[10px] font-extrabold text-[#344d6b]">Updates for you</h2><span className="rounded bg-[#fff2d8] px-2 py-1 text-[7px] font-bold text-[#987320]">2 NEW</span></div>{[['Schedule','We will notify you as soon as the district final date and venue are confirmed.','CalendarDays'],['Announcement','Your signature dish will be shared with the judging panel before your round.','Bell']].map(([title,body])=><div key={title} className="flex gap-3 border-b border-[#f0f2f5] px-4 py-3 last:border-0"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#f3ead8] text-[#ba3038]"><Bell size={13}/></span><div><p className="text-[9px] font-bold text-[#51637a]">{title}</p><p className="mt-1 text-[8px] leading-4 text-[#8b95a3]">{body}</p></div></div>)}</section></div>
        <div className="space-y-3"><section className="border border-[#dfe4ec] bg-white p-4"><div className="flex items-center justify-between"><h2 className="text-[10px] font-extrabold text-[#344d6b]">Next on your schedule</h2><CalendarDays size={15} className="text-[#c62432]"/></div><div className="mt-3 border-l-[3px] border-[#d5a33a] bg-[#fff9eb] p-3"><p className="text-[7px] font-extrabold tracking-wide text-[#987320]">UPCOMING · DATE TO BE CONFIRMED</p><p className="mt-2 text-[10px] font-bold text-[#4c5e76]">Tirunelveli district final</p><p className="mt-1 text-[8px] text-[#8a95a3]">The organizing team will confirm the venue and publish directions here.</p></div><button onClick={()=>openPublicSection(go,'about')} className="mt-3 flex w-full items-center justify-center gap-2 border border-[#dfe4ec] py-2.5 text-[8px] font-bold text-[#566a84]">View event details <ArrowRight size={12}/></button></section>
          <section className="border border-[#dfe4ec] bg-white p-4"><div className="flex items-center justify-between"><h2 className="text-[10px] font-extrabold text-[#344d6b]">District leaderboard</h2><Trophy size={15} className="text-[#d0a138]"/></div><div className="mt-3 flex items-center gap-2.5 bg-[#f5f7fa] p-2.5"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#ffedc2] text-[8px] font-extrabold text-[#916a1d]">#2</span><div className="flex-1"><b className="block text-[8px]">Your current position</b><small className="text-[7px] text-[#8a95a3]">District finalists · Round 2</small></div><b className="text-[10px] text-[#294360]">94 pts</b></div><button onClick={()=>openPublicSection(go,'rounds')} className="mt-3 text-[8px] font-bold text-[#c62432]">View competition information →</button></section>
          <section className="border border-[#dfe4ec] bg-white p-4"><h2 className="text-[10px] font-extrabold text-[#344d6b]">Need help?</h2><p className="mt-1 text-[8px] text-[#8a95a3]">Questions about your registration, schedule or event-day check-in? Our contestant support team can help.</p><a href="tel:+919876543210" className="mt-2 inline-flex items-center gap-2 text-[8px] font-bold text-[#183b68]"><MessageSquare size={12}/> Get support</a></section></div></div><p className="mt-4 text-center text-[7px] text-[#9aa3ae]">Mobile-friendly contestant portal preview · Sample details</p></main>
  </div>;
}

function AdminDashboard({go,activeTab,setActiveTab,query,setQuery,participants}) {
  const menu=[['Overview',LayoutDashboard],['Registrations',Users],['Participants',UserRound],['Districts',MapPin],['Live activity',Activity],['Competition tracking',Flag],['Leaderboard',Trophy],['Notifications',Bell]];
  const exportCsv=async()=>{try{await withLoading('Preparing participant export…',async()=>{await new Promise(resolve=>requestAnimationFrame(resolve));const escape=value=>`"${String(value).replaceAll('"','""')}"`;const rows=['ID,Name,Dish,Area,Stage,Score',...sampleParticipants.map(p=>[p.id,p.name,p.dish,p.area,p.stage,p.score].map(escape).join(','))].join('\n');const url=URL.createObjectURL(new Blob([rows],{type:'text/csv;charset=utf-8'}));try{const a=document.createElement('a');a.href=url;a.download='thezar-tirunelveli-participants.csv';document.body.appendChild(a);a.click();a.remove();}finally{URL.revokeObjectURL(url);}});Notiflix.Notify.success('Participant CSV downloaded.');}catch(error){reportError(error,'The participant export could not be prepared.');}};
  return <div className="organizer-dashboard min-h-screen bg-[#f2f4f7] text-[#263951]"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#112f52] px-4 text-white sm:px-8 xl:px-12"><Brand light goldMark onClick={()=>go('home')}/><div className="hidden items-center gap-2 text-[9px] text-white/70 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/> LIVE OPERATIONS <span className="mx-2 text-white/25">|</span> <MapPin size={12}/> Tirunelveli</div><div className="flex items-center"><button onClick={()=>confirmWorkspaceExit(go)} className="flex items-center gap-1.5 border border-white/25 px-2 py-2 text-[8px] font-bold text-white/90 transition hover:bg-white/10 sm:gap-2 sm:px-3"><ArrowLeft size={13}/> Public event site</button></div></header><div className="flex w-full">
    <aside className="sticky top-16 hidden h-[calc(100vh-64px)] w-60 shrink-0 flex-col border-r border-white/10 bg-[#173b67] px-3 py-5 text-white lg:flex"><p className="px-3 pb-3 text-[7px] font-extrabold tracking-[.16em] text-white/45">TIRUNELVELI EVENT</p>{menu.map(([label,Icon])=><button key={label} onClick={()=>setActiveTab(label)} className={`mb-1 flex items-center gap-3 border-l-2 px-3 py-2.5 text-left text-[9px] font-bold ${activeTab===label?'border-[#ffd36c] bg-white/10 text-white':'border-transparent text-white/65 hover:bg-white/5 hover:text-white'}`}><Icon size={14}/>{label}{label==='Notifications'&&<span className="ml-auto rounded-full bg-[#c62432] px-1.5 py-0.5 text-[7px] text-white">3</span>}</button>)}<div className="mt-auto flex items-center gap-2 border-t border-white/10 pt-4"><span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-[8px] font-bold text-white">EA</span><span><b className="block text-[8px]">Event Admin</b><small className="text-[7px] text-white/50">Thezar team</small></span></div></aside>
    <main className="min-w-0 flex-1 px-4 py-5 sm:px-8 sm:py-7 xl:px-12"><div className="w-full"><div className="mb-5 flex gap-2 overflow-x-auto lg:hidden">{menu.map(([label,Icon])=><button key={label} onClick={()=>setActiveTab(label)} className={`flex shrink-0 items-center gap-1.5 border px-2.5 py-2 text-[8px] font-bold ${activeTab===label?'border-[#c62432] bg-[#f9eaea] text-[#ad2530]':'border-[#dfe4eb] bg-white text-[#617087]'}`}><Icon size={12}/>{label}</button>)}</div><div className="flex flex-col justify-between gap-3 border-b border-[#dce2e9] pb-5 sm:flex-row sm:items-start"><div><p className="text-[8px] font-bold tracking-wide text-[#8c97a6]">EVENTS / TIRUNELVELI COOK-OFF / {activeTab.toUpperCase()}</p><h1 className="mt-1.5 text-xl font-extrabold text-[#183b68]">{activeTab==='Overview'?'Event overview':activeTab}</h1><p className="mt-1 text-[9px] text-[#8691a0]">Tirunelveli district cook-off · Track entries, event-day activity and contestant progress. Sample event data.</p></div><div className="flex gap-2"><button onClick={exportCsv} className="flex items-center gap-2 bg-[#183b68] px-3 py-2.5 text-[8px] font-extrabold text-white"><Download size={12}/> Export participant CSV</button></div></div>
      {activeTab==='Overview'&&<OverviewPanel setActiveTab={setActiveTab}/>}
      {activeTab==='Registrations'&&<RegistrationsPanel query={query} setQuery={setQuery} participants={participants} setActiveTab={setActiveTab}/>}
      {activeTab==='Participants'&&<ParticipantsPanel query={query} setQuery={setQuery} participants={participants} setActiveTab={setActiveTab}/>}
      {activeTab==='Districts'&&<DistrictsPanel setQuery={setQuery} setActiveTab={setActiveTab}/>}
      {activeTab==='Live activity'&&<LiveActivityPanel setActiveTab={setActiveTab}/>}
      {activeTab==='Competition tracking'&&<TrackingPanel setQuery={setQuery} setActiveTab={setActiveTab}/>}
      {activeTab==='Leaderboard'&&<LeaderboardPanel/>}
      {activeTab==='Notifications'&&<NotificationsPanel/>}
    </div></main></div></div>;
}

function RoleOperationsDashboard({go,role}) {
  const [activeArea,setActiveArea]=useState('Overview');
  const [checkedIn,setCheckedIn]=useState(()=>new Set(sampleParticipants.slice(0,2).map(person=>person.id)));
  const criteria=districtRounds[0].criteria;
  const [scores,setScores]=useState(()=>Object.fromEntries(sampleParticipants.map(person=>[person.id,Object.fromEntries(criteria.map(([label])=>[label,'']))])));
  const [submitted,setSubmitted]=useState({});
  const updateScore=(id,label,value)=>setScores(current=>({...current,[id]:{...current[id],[label]:value}}));
  const toggleCheckin=id=>{const markingArrival=!checkedIn.has(id);setCheckedIn(current=>{const next=new Set(current);next.has(id)?next.delete(id):next.add(id);return next;});Notiflix.Notify.success(markingArrival?'Arrival marked in this preview.':'Check-in status cleared.');};
  const roleDetails={
    'District coordinator':{icon:MapPin,subtitle:'Manage Tirunelveli entries, district rounds and contestant progress.'},
    Judge:{icon:ShieldCheck,subtitle:'Review your assigned cook-off and submit independent contestant scores.'},
    Volunteer:{icon:Users,subtitle:'Welcome contestants, manage check-in and keep event-day activities moving.'},
  }[role]||{icon:LayoutDashboard,subtitle:'Thezar event operations'};
  const RoleIcon=roleDetails.icon;
  const roleLinks=role==='District coordinator'
    ? [['Overview',LayoutDashboard],['Round plan',CalendarDays],['Contestant roster',Users]]
    : role==='Judge'
      ? [['Overview',LayoutDashboard],['Scorecards',ShieldCheck]]
      : [['Overview',LayoutDashboard],['Check-in',Users],['Shift plan',CalendarDays]];
  const metrics=role==='District coordinator'
    ? [[MapPin,'DISTRICT','Tirunelveli','bg-[#eee7d4] text-[#80602d]'],[Flag,'ROUND FORMAT','4 cooking rounds','bg-[#e7edf3] text-[#405774]'],[Trophy,'ADVANCING','1 district champion','bg-[#f2e8d8] text-[#93693c]']]
    : role==='Judge'
      ? [[Utensils,'ASSIGNED ROUND','Home Cooking Challenge','bg-[#eee7d4] text-[#80602d]'],[Check,'SCORECARDS',`${Object.keys(submitted).length} / ${sampleParticipants.length} submitted`,'bg-[#e7edf3] text-[#405774]'],[ShieldCheck,'JUDGING BASIS','100 points','bg-[#f2e8d8] text-[#93693c]']]
      : [[Users,'CHECKED IN',`${checkedIn.size} / ${sampleParticipants.length}`,'bg-[#eee7d4] text-[#80602d]'],[Activity,'NEXT DUTY','Audition check-in','bg-[#e7edf3] text-[#405774]'],[Clock3,'SHIFT','08:30 AM · Main entrance','bg-[#f2e8d8] text-[#93693c]']];
  const areaCopy={
    Overview:roleDetails.subtitle,
    'Round plan':'Review each district challenge, contestant count and progression.',
    'Contestant roster':'Review Tirunelveli contestants and their current competition stage.',
    Scorecards:'Enter and submit independent scores for the assigned round.',
    'Check-in':'Record contestant arrivals at the audition desk.',
    'Shift plan':'Review your event-day assignments and timing.',
  };
  return <div className="organizer-dashboard min-h-screen bg-[#f2f4f7] text-[#263951]">
    <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-white/10 bg-[#112f52] px-4 text-white sm:px-8 xl:px-12">
      <Brand light goldMark onClick={()=>go('home')}/>
      <div className="hidden items-center gap-2 text-[10px] font-bold tracking-wide text-white/80 sm:flex"><span className="grid h-8 w-8 place-items-center border border-[#d2b36d]/45 bg-white/5 text-[#e2c77f]"><RoleIcon size={16}/></span><span>{role.toUpperCase()}<small className="mt-0.5 block text-[9px] font-normal text-white/55">TIRUNELVELI EVENT</small></span></div>
      <button onClick={()=>confirmWorkspaceExit(go)} className="flex items-center gap-1.5 border border-white/25 px-2.5 py-2 text-[9px] font-bold text-white/90 hover:bg-white/10 sm:px-3"><ArrowLeft size={13}/> Event site</button>
    </header>
    <div className="role-dashboard-layout">
      <aside className="role-dashboard-sidebar"><p className="role-dashboard-sidebar-label">YOUR WORKSPACE</p><div className="role-dashboard-sidebar-role"><span className="role-dashboard-sidebar-icon"><RoleIcon size={17}/></span><span><b>{role}</b><small>Tirunelveli · Cook-off</small></span></div><nav aria-label={`${role} dashboard sections`}>{roleLinks.map(([label,Icon])=><button type="button" key={label} onClick={()=>setActiveArea(label)} className={activeArea===label?'is-current':''}><Icon size={15}/>{label}</button>)}</nav><div className="role-dashboard-profile"><span className="role-dashboard-profile-avatar">{role.split(' ').map(word=>word[0]).join('').slice(0,2).toUpperCase()}</span><span><b>{role}</b><small>Role preview</small></span></div></aside>
      <main className="role-dashboard-main">
      <nav className="role-dashboard-mobile-nav" aria-label={`${role} dashboard sections`}>{roleLinks.map(([label,Icon])=><button type="button" key={label} onClick={()=>setActiveArea(label)} className={activeArea===label?'is-current':''}><Icon size={14}/>{label}</button>)}</nav>
      <section className="role-dashboard-hero"><div className="role-dashboard-hero-icon"><RoleIcon size={24}/></div><div><p>THEZAR · {role.toUpperCase()}</p><h1>{activeArea==='Overview'?`${role} dashboard`:activeArea}</h1><span>{areaCopy[activeArea]}</span></div><span className="role-dashboard-hero-tag"><i/>TIRUNELVELI</span></section>
      {activeArea==='Overview'&&<div className="role-dashboard-metrics">{metrics.map(([Icon,label,value,tone])=><article key={label} className="role-dashboard-metric"><span className={tone}><Icon size={18}/></span><div><small>{label}</small><b>{value}</b></div></article>)}</div>}
      {role==='District coordinator'&&<DistrictCoordinatorWorkspace view={activeArea}/>}
      {role==='Judge'&&activeArea==='Overview'&&<JudgeOverview/>}
      {role==='Judge'&&activeArea==='Scorecards'&&<section className="mt-1">
        <div className="role-dashboard-section-head"><div><p>JUDGE WORKLIST</p><h2>Assigned contestant scorecards</h2><span>Score each entry against the published round criteria. Scores in this preview stay in this browser session.</span></div><span className="role-dashboard-section-count">{sampleParticipants.length} ENTRIES</span></div>
        <div className="grid gap-4 xl:grid-cols-2">{sampleParticipants.map(person=>{
          const total=criteria.reduce((sum,[label])=>sum+Number(scores[person.id]?.[label]||0),0);
          return <form key={person.id} onSubmit={event=>{event.preventDefault();try{setSubmitted(current=>({...current,[person.id]:total}));Notiflix.Notify.success(`Scorecard for ${person.name} saved in this preview.`);}catch(error){reportError(error,'The scorecard could not be saved.');}}} className="border border-[#d5c59f] border-t-4 border-t-[#b99550] bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-3 border-b border-[#e7e1d5] pb-3"><div><p className="text-[10px] font-extrabold tracking-wide text-[#997943]">{person.id}</p><h3 className="mt-1 text-xl font-bold text-[#183b68]">{person.name}</h3><p className="mt-1 text-sm text-[#788497]">{person.dish} · {person.area}</p></div><span className="border border-[#d8c69d] bg-[#f7f1e2] px-2 py-1 text-xs font-bold text-[#80602d]">{submitted[person.id]!==undefined?`${submitted[person.id]} pts`:'Pending'}</span></div>
            <div className="mt-4 grid grid-cols-2 gap-3">{criteria.map(([label,max])=><label key={label} className="text-xs font-semibold text-[#53647a]">{label} <span className="text-[#929baa]">/ {max}</span><input required type="number" min="0" max={max} value={scores[person.id]?.[label]??''} onChange={event=>updateScore(person.id,label,event.target.value)} className="mt-1.5 block h-10 w-full border border-[#ded6c4] px-3 text-sm text-[#183b68] outline-none focus:border-[#b99550]"/></label>)}</div>
            <div className="mt-4 flex items-center justify-between gap-3"><span className="text-sm font-bold text-[#183b68]">Total <b className="ml-2 text-lg">{total}</b><small className="text-[#7c8795]"> / 100</small></span><button type="submit" className="bg-[#183b68] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#244b6d]">{submitted[person.id]!==undefined?'Update score':'Submit score'}</button></div>
          </form>;
        })}</div>
      </section>}
      {role==='Volunteer'&&activeArea==='Overview'&&<VolunteerOverview/>}
      {role==='Volunteer'&&activeArea==='Check-in'&&<section className="mt-1">
        <div className="grid gap-5">
          <section className="border border-[#d8dfE8] bg-white"><div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2e7ed] px-4 py-4 sm:px-5"><div><p className="role-dashboard-panel-kicker">ARRIVALS · TIRUNELVELI</p><h2 className="mt-1 text-xl font-bold text-[#183b68]">Contestant check-in</h2><p className="mt-1 text-sm text-[#778396]">Mark arrivals at the Tirunelveli audition desk.</p></div><span className="bg-[#f4efdf] px-3 py-1.5 text-xs font-bold text-[#80602d]">SAMPLE ROSTER</span></div>
            <div className="divide-y divide-[#edf0f3]">{sampleParticipants.map(person=><div key={person.id} className="flex flex-wrap items-center gap-3 px-4 py-3.5 sm:px-5"><span className="grid h-10 w-10 place-items-center bg-[#e9edf2] text-sm font-bold text-[#405774]">{person.initials}</span><div className="min-w-0 flex-1"><b className="block text-sm text-[#334d6b]">{person.name}</b><small className="text-xs text-[#8290a1]">{person.id} · {person.area}</small></div><button onClick={()=>toggleCheckin(person.id)} className={`min-w-28 px-3 py-2 text-xs font-bold ${checkedIn.has(person.id)?'border border-emerald-200 bg-emerald-50 text-emerald-700':'bg-[#183b68] text-white hover:bg-[#244b6d]'}`}>{checkedIn.has(person.id)?'✓ Checked in':'Mark arrival'}</button></div>)}</div>
          </section>
          
        </div>
      </section>}
      {role==='Volunteer'&&activeArea==='Shift plan'&&<VolunteerShiftPlan/>}
      </main>
    </div>
  </div>;
}

function DistrictCoordinatorWorkspace({view}) {
  if(view==='Overview') return <section className="role-dashboard-feature-card"><div className="role-dashboard-feature-icon"><MapPin size={21}/></div><div><p className="role-dashboard-panel-kicker">NEXT DISTRICT MILESTONE</p><h2>Home Cooking Challenge</h2><p>Prepare the opening round brief, confirm the local contestant list and keep the judging team aligned.</p></div><span className="role-dashboard-feature-count"><b>100</b><small>registered cooks</small></span></section>;
  if(view==='Round plan') return <section id="district-round-plan" className="role-dashboard-data-panel"><div className="role-dashboard-data-panel-head"><div><p className="role-dashboard-panel-kicker">DISTRICT OPERATIONS</p><h2>District round plan</h2><p>Coordinate the challenge, contestant count and judging brief for each round.</p></div><span className="role-dashboard-section-count">4 ROUNDS</span></div><div className="role-dashboard-round-list">{districtRounds.map((round,index)=><article key={round.title} className="role-dashboard-round-row"><span className="role-dashboard-round-number">0{index+1}</span><div className="min-w-0 flex-1"><h3>{round.title}</h3><p>{round.task}</p><small>{round.from} contestants <ArrowRight className="mx-1 inline" size={12}/> {round.to} advance</small></div></article>)}</div></section>;
  return <section id="district-roster" className="role-dashboard-data-panel"><div className="role-dashboard-data-panel-head"><div><p className="role-dashboard-panel-kicker">PEOPLE · TIRUNELVELI</p><h2>Contestant roster</h2><p>Review local applicants and their current round status.</p></div><span className="role-dashboard-section-count">{sampleParticipants.length} SAMPLE ENTRIES</span></div><div className="role-dashboard-roster">{sampleParticipants.map(person=><article key={person.id} className="role-dashboard-roster-row"><span className="role-dashboard-roster-avatar">{person.initials}</span><div className="min-w-0 flex-1"><b>{person.name}</b><small>{person.id} · {person.dish} · {person.area}</small></div><span className="role-dashboard-roster-stage">{person.stage}</span></article>)}</div></section>;
}

function JudgeOverview() {
  return <section className="role-dashboard-feature-card"><div className="role-dashboard-feature-icon"><ShieldCheck size={21}/></div><div><p className="role-dashboard-panel-kicker">CURRENT ASSIGNMENT</p><h2>Home Cooking Challenge</h2><p>Score each contestant independently. Use the same published criteria for every dish and submit each scorecard when complete.</p></div><span className="role-dashboard-feature-count"><b>100</b><small>points total</small></span></section>;
}

function VolunteerOverview() {
  return <section className="role-dashboard-feature-card"><div className="role-dashboard-feature-icon"><Clock3 size={21}/></div><div><p className="role-dashboard-panel-kicker">NEXT DUTY · 08:30 AM</p><h2>Audition check-in</h2><p>Welcome contestants at the main entrance, confirm their name and ID, and guide them to the briefing area.</p></div><span className="role-dashboard-feature-count"><b>MAIN</b><small>entrance desk</small></span></section>;
}

function VolunteerShiftPlan() {
  return <section className="role-dashboard-data-panel"><div className="role-dashboard-data-panel-head"><div><p className="role-dashboard-panel-kicker">VOLUNTEER ASSIGNMENT</p><h2>Event-day shift plan</h2><p>Use this run sheet to help contestants and guests move through the event.</p></div><span className="role-dashboard-section-count">08:30 AM START</span></div><div className="role-dashboard-shift-list">{[['08:30 AM','Set up the welcome desk'],['09:00 AM','Check participant names and IDs'],['10:00 AM','Guide contestants to the briefing area'],['11:30 AM','Direct guests to the live cook-off']].map(([time,task],index)=><article key={time} className="role-dashboard-shift-row"><span className="role-dashboard-shift-time">{time}</span><span className="role-dashboard-shift-dot"/><div><small>STEP 0{index+1}</small><b>{task}</b></div></article>)}</div><p className="role-dashboard-note">For schedule changes or support, check with the event organizer at the operations desk.</p></section>;
}

function OverviewPanel({setActiveTab}) {
  const stats=[
    [Users,'Registrations','1,248','+12.8% this week','bg-blue-50 text-blue-700'],
    [ShieldCheck,'Approved','864','69% of applicants','bg-emerald-50 text-emerald-700'],
    [Activity,'In competition','186','Across 3 rounds','bg-violet-50 text-violet-700'],
    [Trophy,'Finalists','24','Chennai finale','bg-amber-50 text-amber-700']
  ];
  const quickActions=[['Registrations','Review applications'],['Districts','Manage district rounds'],['Leaderboard','Review current rankings'],['Notifications','Send event announcements']];
  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 xl:gap-4">
        {stats.map(([Icon,label,value,sub,colors])=>(
          <button key={label} onClick={()=>setActiveTab(label==='Registrations'?'Registrations':label==='Approved'?'Participants':'Competition tracking')} className="group border border-[#9aa9ba] border-t-2 border-t-[#c62432] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-5">
            <span className={'grid h-9 w-9 place-items-center '+colors}><Icon size={17}/></span>
            <p className="mt-4 text-[8px] font-bold uppercase tracking-wide text-[#718197]">{label}</p>
            <b className="mt-1 block text-2xl font-bold text-[#29415f]">{value}</b>
            <small className="mt-1 block text-[7px] text-[#75859a]">{sub}</small>
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-4 xl:grid-cols-[1.35fr_.85fr]">
        <section className="border border-[#9aa9ba] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#d8e0e9] px-5 py-4">
            <div><h2 className="text-[10px] font-extrabold text-[#344a66]">Registration activity</h2><p className="mt-1 text-[8px] text-[#75859a]">Daily applications received · Tirunelveli pilot</p></div>
            <button onClick={()=>setActiveTab('Registrations')} className="text-[8px] font-bold text-[#c62432] hover:underline">View registrations →</button>
          </div>
          <div className="flex h-48 items-end gap-3 px-5 pb-4 pt-5 sm:gap-5">
            {[['M',38],['T',60],['W',48],['T',74],['F',55],['S',96],['S',70]].map(([day,val],i)=>(
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className={'w-full max-w-12 '+(i===5?'bg-[#c62432]':'bg-[#b8c7d8]')} style={{height:val+'%'}}/>
                <small className="text-[7px] text-[#75859a]">{day}</small>
              </div>
            ))}
          </div>
        </section>
        <section className="flex min-h-[240px] flex-col justify-between border border-[#183b68] bg-[#183b68] p-5 text-white shadow-sm">
          <div>
            <div className="flex items-center justify-between">
              <div><p className="text-[8px] font-extrabold tracking-[.15em] text-[#ffd36c]">NEXT EVENT ACTIVITY</p><h2 className="mt-2 text-lg font-bold">Audition check-in</h2><p className="mt-1 text-[8px] text-white/70">Batch A · Tirunelveli</p></div>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Activity size={18}/></span>
            </div>
            <p className="mt-6 text-[8px] text-white/75">24 of 32 participants have checked in for the current audition batch.</p>
            <div className="mt-3 h-2 bg-white/15"><div className="h-full w-3/4 bg-[#ffd36c]"/></div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4"><span className="text-[8px] text-white/65">Check-in progress · 75%</span><button onClick={()=>setActiveTab('Live activity')} className="text-[8px] font-extrabold text-[#ffd36c] hover:underline">Open live monitor →</button></div>
        </section>
      </div>
      <section className="mt-5 overflow-hidden border border-[#9aa9ba] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#d8e0e9] px-5 py-4">
          <div><h2 className="text-[10px] font-extrabold text-[#344a66]">Recent contestant activity</h2><p className="mt-1 text-[8px] text-[#75859a]">Latest entries and progress in the Tirunelveli cook-off</p></div>
          <button onClick={()=>setActiveTab('Registrations')} className="text-[8px] font-bold text-[#c62432] hover:underline">Open registrations →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead><tr className="bg-[#f4f6f8] text-[7px] font-extrabold tracking-wide text-[#718197]"><th className="px-5 py-3">CONTESTANT</th><th className="px-3 py-3">SIGNATURE DISH</th><th className="px-3 py-3">AREA</th><th className="px-3 py-3">CURRENT STAGE</th><th className="px-4 py-3 text-right">SCORE</th></tr></thead>
            <tbody>{sampleParticipants.slice(0,5).map(p=>(
              <tr key={p.id} className="border-t border-[#e1e6ec] text-[8px]">
                <td className="px-5 py-3"><b className="block text-[#344a66]">{p.name}</b><small className="text-[#8391a2]">{p.id}</small></td>
                <td className="px-3 py-3 text-[#596b80]">{p.dish}</td><td className="px-3 py-3 text-[#596b80]">{p.area}</td>
                <td className="px-3 py-3"><span className="inline-flex border border-[#d5dde6] bg-[#f7f8fa] px-2 py-1 text-[7px] font-semibold text-[#53677e]">{p.stage}</span></td>
                <td className="px-4 py-3 text-right font-bold text-[#183b68]">{p.score}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map(([tab,desc])=>(
          <button key={tab} onClick={()=>setActiveTab(tab)} className="flex items-center justify-between border border-[#9aa9ba] bg-white p-4 text-left shadow-sm transition hover:border-[#183b68] hover:shadow-md">
            <span><b className="block text-[9px] text-[#344a66]">{tab}</b><small className="mt-1 block text-[7px] text-[#75859a]">{desc}</small></span><ArrowRight size={14} className="text-[#c62432]"/>
          </button>
        ))}
      </div>
    </>
  );
}
function RegistrationsPanel({query,setQuery,participants,setActiveTab}) { return <section className="mt-5 border border-[#e0e5ec] bg-white"><div className="flex flex-col justify-between gap-2 border-b border-[#e8ecf1] px-4 py-3 sm:flex-row sm:items-center"><div><h2 className="text-[10px] font-extrabold text-[#344a66]">Participant registrations</h2><p className="mt-1 text-[8px] text-[#8a95a4]">Review contact details, district and application status</p></div><label className="flex items-center gap-2 border border-[#e0e5ec] px-2"><Search size={12} className="text-[#8c97a6]"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search applications" className="h-8 w-40 text-[8px] outline-none"/></label></div><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left"><thead><tr className="bg-[#f8f9fb] text-[7px] font-extrabold tracking-wide text-[#8c97a6]"><th className="px-4 py-2.5">PARTICIPANT / ID</th><th className="px-3 py-2.5">DISH</th><th className="px-3 py-2.5">DISTRICT / AREA</th><th className="px-3 py-2.5">APPLICATION STATUS</th><th className="px-3 py-2.5">ACTION</th></tr></thead><tbody>{participants.map(p=><tr key={p.id} className="border-t border-[#edf0f4] text-[8px]"><td className="px-4 py-3"><b className="block text-[#44566e]">{p.name}</b><small className="text-[#929cac]">{p.id}</small></td><td className="px-3 py-3 text-[#617087]">{p.dish}</td><td className="px-3 py-3 text-[#758196]">{p.area}</td><td className="px-3 py-3"><span className="bg-emerald-50 px-2 py-1 font-bold text-emerald-700">Received</span></td><td className="px-3 py-3"><button onClick={()=>setActiveTab('Participants')} className="font-bold text-[#c62432]">Review participant ?</button></td></tr>)}</tbody></table></div></section>; }

function ParticipantsPanel({query,setQuery,participants,setActiveTab}) { return <section className="mt-5 border border-[#e0e5ec] bg-white"><div className="flex flex-col justify-between gap-2 border-b border-[#e8ecf1] px-4 py-3 sm:flex-row sm:items-center"><div><h2 className="text-[10px] font-extrabold text-[#344a66]">Participant directory</h2><p className="mt-1 text-[8px] text-[#8a95a4]">Track contestant stage, score and district</p></div><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search participants" className="h-8 border border-[#e0e5ec] px-2 text-[8px] outline-none"/></div><div className="grid gap-2 p-3 sm:grid-cols-2 xl:grid-cols-3">{participants.map(p=><article key={p.id} className="flex items-center gap-3 border border-[#e9edf1] bg-[#fffdf8] p-3"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#dbe6f2] text-[8px] font-extrabold text-[#304c6c]">{p.initials}</span><div className="min-w-0 flex-1"><b className="block text-[9px] text-[#43566f]">{p.name}</b><small className="mt-1 block truncate text-[7px] text-[#8d97a6]">{p.id} · {p.area}</small><small className="mt-1 block text-[7px] font-bold text-[#c62432]">{p.stage} · {p.score} points</small></div><button onClick={()=>setActiveTab('Competition tracking')} className="text-[8px] font-bold text-[#183b68]">Progress ?</button></article>)}</div></section>; }

function DistrictsPanel({setQuery,setActiveTab}) { const [rounds,setRounds]=useState(4); return <section className="mt-5 border border-[#e0e5ec] bg-white"><div className="flex flex-col justify-between gap-2 border-b border-[#e8ecf1] px-4 py-3 sm:flex-row sm:items-center"><div><h2 className="text-[10px] font-extrabold text-[#344a66]">District management</h2><p className="mt-1 text-[8px] text-[#8a95a4]">Plan the district rollout · Tirunelveli is the pilot</p></div><button onClick={()=>{setRounds(current=>current+1);Notiflix.Notify.success('A draft district round was added to this preview.');}} className="bg-[#183b68] px-3 py-2 text-[8px] font-extrabold text-white">Add district round</button></div>{rounds>4&&<p className="mx-3 mt-3 border border-[#d8c69d] bg-[#fff8e9] px-3 py-2 text-[8px] text-[#80602d]">Draft round {rounds-4} · New district cook-off round · Preview only</p>}<div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 lg:grid-cols-4">{districtNames.map((district,i)=><button key={district} onClick={()=>{setQuery(district);setActiveTab('Registrations');if(i===0)Notiflix.Notify.success(`Showing sample entries for ${district}.`);else Notiflix.Notify.warning(`${district} is planned; no sample registrations are available yet.`);}} className={`flex items-center justify-between border p-3 text-left ${i===0?'border-[#c62432] bg-[#fff3f1]':'border-[#e5e9ef] bg-[#fffdf8]'}`}><span><b className="block text-[8px] text-[#475a73]">{district}</b><small className="mt-1 block text-[7px] text-[#8c97a5]">{i===0?'Pilot · Cooking':'Planned district'}</small></span><span className={`h-2 w-2 rounded-full ${i===0?'bg-[#c62432]':'bg-[#d2a33e]'}`}/></button>)}</div><p className="border-t border-[#e8ecf1] px-4 py-3 text-[8px] text-[#8893a2]">District rollout overview · 38 districts planned in the full program.</p></section>; }

function LiveActivityPanel({setActiveTab}) { return <div className="mt-5 grid gap-3 lg:grid-cols-[1.2fr_.8fr]"><section className="border border-[#e0e5ec] bg-white"><div className="flex items-center justify-between border-b border-[#e8ecf1] px-4 py-3"><div><h2 className="text-[10px] font-extrabold text-[#344a66]">Live event activity</h2><p className="mt-1 text-[8px] text-[#8a95a4]">Tirunelveli cook-off · activity feed</p></div><span className="flex items-center gap-1.5 text-[7px] font-extrabold text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/> LIVE</span></div>{liveItems.map(([time,title,detail,color])=><div key={title} className="flex gap-3 border-b border-[#f0f2f5] px-4 py-4 last:border-0"><span className={`mt-1 h-2 w-2 rounded-full ${color}`}/><div className="flex-1"><div className="flex justify-between gap-2"><b className="text-[9px] text-[#495d76]">{title}</b><time className="text-[7px] text-[#8d98a6]">{time}</time></div><p className="mt-1 text-[8px] text-[#8792a0]">{detail}</p></div></div>)}</section><section className="bg-[#183b68] p-5 text-white"><p className="text-[8px] font-extrabold tracking-[.15em] text-[#ffd36c]">EVENT STATUS</p><h2 className="mt-2 text-lg font-extrabold">Audition day</h2><p className="mt-1 text-[8px] text-white/65">Live operations · Tirunelveli</p><div className="mt-5 space-y-3 border-t border-white/15 pt-4">{[['Checked in','24 / 40'],['Scorecards received','8 / 12'],['Next activity','Cook-off · 11:30 AM']].map(([a,b])=><p key={a} className="flex justify-between text-[8px]"><span className="text-white/65">{a}</span><b>{b}</b></p>)}</div><button onClick={()=>setActiveTab('Notifications')} className="mt-5 w-full bg-[#c62432] py-2.5 text-[8px] font-extrabold uppercase">Post event update ?</button></section></div>; }

function TrackingPanel({setQuery,setActiveTab}) { return <section className="mt-5 border border-[#e0e5ec] bg-white"><div className="border-b border-[#e8ecf1] px-4 py-3"><h2 className="text-[10px] font-extrabold text-[#344a66]">Competition progress by round</h2><p className="mt-1 text-[8px] text-[#8a95a4]">Track the contestant journey from application to finale</p></div><div className="grid gap-3 p-4 sm:grid-cols-2">{[['Registration','1,248','100%','bg-[#183b68]'],['Audition','864','69%','bg-[#3778aa]'],['Live cook-off','186','15%','bg-[#d4a33e]'],['Finalists','24','2%','bg-[#c62432]']].map(([stage,count,pct,color])=><article key={stage} className="border border-[#e9edf1] p-3"><div className="flex justify-between text-[8px]"><b className="text-[#50627b]">{stage}</b><span className="text-[#8994a3]">{count} participants · {pct}</span></div><div className="mt-2 h-2 bg-[#edf0f4]"><div className={`h-full ${color}`} style={{width:pct}}/></div><button onClick={()=>{setQuery(stage==='Registration'?'':stage);setActiveTab('Participants');Notiflix.Notify.info(stage==='Registration'?'Showing all sample participants.':`Showing participants matching “${stage}”.`);}} className="mt-2 text-[7px] font-bold text-[#c62432]">View stage participants →</button></article>)}</div></section>; }

function LeaderboardPanel() { return <section className="mt-5 border border-[#e0e5ec] bg-white"><div className="flex items-center justify-between border-b border-[#e8ecf1] px-4 py-3"><div><h2 className="text-[10px] font-extrabold text-[#344a66]">Tirunelveli leaderboard</h2><p className="mt-1 text-[8px] text-[#8a95a4]">Round 2 · Judge score average</p></div><Trophy size={16} className="text-[#d0a138]"/></div><div className="overflow-x-auto"><table className="w-full min-w-[480px] text-left"><thead><tr className="bg-[#f8f9fb] text-[7px] font-extrabold text-[#8c97a6]"><th className="px-4 py-2">RANK</th><th className="px-3 py-2">CONTESTANT</th><th className="px-3 py-2">DISH</th><th className="px-3 py-2">SCORE</th><th className="px-3 py-2">STAGE</th></tr></thead><tbody>{[...sampleParticipants].sort((a,b)=>b.score-a.score).map((p,i)=><tr key={p.id} className="border-t border-[#edf0f4] text-[8px]"><td className="px-4 py-3"><span className={`grid h-6 w-6 place-items-center rounded-full font-extrabold ${i===0?'bg-[#ffedc2] text-[#906b1d]':'bg-[#eef1f5] text-[#6b788c]'}`}>{i+1}</span></td><td className="px-3 py-3 font-bold text-[#4b5d75]">{p.name}</td><td className="px-3 py-3 text-[#778396]">{p.dish}</td><td className="px-3 py-3 font-extrabold text-[#183b68]">{p.score}</td><td className="px-3 py-3 text-[#758196]">{p.stage}</td></tr>)}</tbody></table></div><div className="flex items-center gap-2 bg-[#fff8e9] px-4 py-3 text-[8px] text-[#7f6a3b]"><Eye size={12}/> Published rankings are visible in contestant portals.</div></section>; }

function NotificationsPanel() { const [draft,setDraft]=useState(''); const [preview,setPreview]=useState(''); return <section className="mt-5 border border-[#e0e5ec] bg-white"><div className="flex items-center justify-between border-b border-[#e8ecf1] px-4 py-3"><div><h2 className="text-[10px] font-extrabold text-[#344a66]">Notifications & announcements</h2><p className="mt-1 text-[8px] text-[#8a95a4]">Draft an event update for preview</p></div><Bell size={15} className="text-[#c62432]"/></div><div className="grid gap-3 p-4 md:grid-cols-[1fr_1fr]"><div className="space-y-2">{[['Schedule update','Audition slots will be shared shortly.','Draft'],['Results','Round 1 scorecards are ready for review.','Needs review'],['Venue update','Tirunelveli venue confirmation is pending.','Draft']].map(([title,detail,status])=><article key={title} className="flex items-center gap-3 border border-[#e9edf1] p-3"><span className="grid h-7 w-7 place-items-center bg-[#f3ead8] text-[#c62432]"><Bell size={13}/></span><span className="flex-1"><b className="block text-[8px] text-[#4b5e76]">{title}</b><small className="mt-1 block text-[7px] text-[#8994a2]">{detail}</small></span><small className="text-[7px] font-bold text-[#9b792b]">{status}</small></article>)}</div><form onSubmit={e=>{e.preventDefault();try{const message=draft.trim();setPreview(message);Notiflix.Report.info('Announcement preview',`${message}\n\nThis is a local draft preview. No announcement has been sent.`,'Close');}catch(error){reportError(error,'The announcement preview could not be created.');}}} className="border border-[#e9edf1] bg-[#fffdf8] p-3"><label className="text-[8px] font-extrabold text-[#465a74]">Create announcement<textarea required value={draft} onChange={event=>setDraft(event.target.value)} placeholder="Type an event update" className="mt-2 h-20 w-full resize-none border border-[#dfe4eb] bg-white p-2 text-[8px] outline-none focus:border-[#c62432]"/></label><button className="mt-2 bg-[#c62432] px-3 py-2 text-[8px] font-extrabold text-white">Preview announcement</button>{preview&&<p className="mt-2 border-l-2 border-[#c5a04b] bg-[#fff8e9] p-2 text-[8px] text-[#53647a]">Draft preview ready: {preview}</p>}</form></div></section>; }

createRoot(document.getElementById('root')).render(<App/>);






