import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  Apple,
  ArrowRight,
  Award,
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Droplets,
  HeartPulse,
  Home,
  Menu,
  Moon,
  MoreHorizontal,
  Plus,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import "./index.css";

const navItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "health", label: "Health", icon: HeartPulse },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "nutrition", label: "Nutrition", icon: Apple },
  { id: "hydration", label: "Hydration", icon: Droplets },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "goals", label: "Goals", icon: Target },
  { id: "coach", label: "AI Health Coach", icon: Sparkles },
];

const initialMeals = [
  { type: "Breakfast", name: "Oatmeal & Banana", calories: 380, protein: 14, icon: "🥣" },
  { type: "Lunch", name: "Chicken Rice Bowl", calories: 520, protein: 38, icon: "🍱" },
  { type: "Snack", name: "Greek Yogurt & Nuts", calories: 220, protein: 15, icon: "🥜" },
  { type: "Dinner", name: "Grilled Chicken Salad", calories: 430, protein: 36, icon: "🥗" },
];

const activityData = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 62 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 78 },
  { day: "Fri", value: 60 },
  { day: "Sat", value: 88 },
  { day: "Sun", value: 72 },
];

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [activePage, setActivePage] = useState("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [water, setWater] = useState(6);
  const [meals, setMeals] = useState(initialMeals);

  const [profile, setProfile] = useState({
    name: "Dhayanithi",
    email: "dhayanithi@example.com",
    age: "20",
    height: "172",
    weight: "68",
  });

  const navigate = (page) => {
    setActivePage(page);
    setMobileOpen(false);
    setNotifications(false);
  };

  if (!authenticated) {
    return (
      <AuthScreen
        mode={authMode}
        setMode={setAuthMode}
        onLogin={() => setAuthenticated(true)}
      />
    );
  }

  return (
    <div className="health-app">
      {mobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        activePage={activePage}
        navigate={navigate}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onLogout={() => setAuthenticated(false)}
      />

      <div className="app-content">
        <Topbar
          onMenu={() => setMobileOpen(true)}
          onNotification={() => setNotifications(!notifications)}
          notifications={notifications}
          profile={profile}
        />

        {notifications && <NotificationPanel />}

        <main className="content">
          {activePage === "overview" && (
            <Overview
              profile={profile}
              water={water}
              meals={meals}
              navigate={navigate}
            />
          )}

          {activePage === "health" && <HealthPage profile={profile} />}
          {activePage === "activity" && <ActivityPage />}

          {activePage === "nutrition" && (
            <NutritionPage meals={meals} setMeals={setMeals} />
          )}

          {activePage === "hydration" && (
            <HydrationPage water={water} setWater={setWater} />
          )}

          {activePage === "progress" && <ProgressPage />}
          {activePage === "goals" && <GoalsPage />}
          {activePage === "coach" && <CoachPage />}

          {activePage === "profile" && (
            <ProfilePage profile={profile} setProfile={setProfile} />
          )}

          {activePage === "settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

/* =========================
   AUTH
========================= */

function AuthScreen({ mode, setMode, onLogin }) {
  const isLogin = mode === "login";

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="brand-mark">
            <HeartPulse size={25} />
          </div>

          <div>
            <strong>FitBuddy</strong>
            <span>Health & Wellness</span>
          </div>
        </div>

        <div className="auth-hero">
          <div className="hero-pill">
            <Sparkles size={14} />
            Your personal wellness companion
          </div>

          <h1>
            Take care of your
            <span> health.</span>
            <br />
            Every single day.
          </h1>

          <p>
            Track your health, nutrition, activity and wellness goals
            in one simple and beautiful place.
          </p>

          <div className="health-preview">
            <div className="preview-heart">
              <HeartPulse size={25} />
            </div>

            <div className="preview-info">
              <span>Today's Health Score</span>
              <strong>87 / 100</strong>
            </div>

            <div className="preview-status">Good</div>
          </div>

          <div className="auth-features">
            <Feature
              icon={<ShieldCheck size={17} />}
              text="Private & secure health tracking"
            />

            <Feature
              icon={<Sparkles size={17} />}
              text="AI-powered wellness guidance"
            />

            <Feature
              icon={<Activity size={17} />}
              text="Complete health overview"
            />
          </div>
        </div>

        <div className="auth-footer">
          © 2026 FitBuddy · Health & Wellness
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="mobile-auth-brand">
            <div className="brand-mark">
              <HeartPulse size={22} />
            </div>
            <strong>FitBuddy</strong>
          </div>

          <div className="auth-heading">
            <span className="auth-small-label">
              {isLogin ? "WELCOME BACK" : "GET STARTED"}
            </span>

            <h2>
              {isLogin ? "Welcome back 👋" : "Create your account"}
            </h2>

            <p>
              {isLogin
                ? "Sign in to continue your wellness journey."
                : "Start building healthier habits today."}
            </p>
          </div>

          <div className="auth-form">
            {!isLogin && (
              <Input
                label="Full name"
                placeholder="Enter your name"
              />
            )}

            <Input
              label="Email address"
              placeholder="you@example.com"
              type="email"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            {!isLogin && (
              <Input
                label="Confirm password"
                placeholder="Confirm your password"
                type="password"
              />
            )}

            {isLogin && (
              <div className="auth-options">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>

                <button type="button">Forgot password?</button>
              </div>
            )}

            <button className="auth-submit" onClick={onLogin}>
              {isLogin ? "Sign in" : "Create account"}
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <button type="button">
              <span className="google-icon">G</span>
              Google
            </button>

            <button type="button">
              <span className="apple-icon">●</span>
              Apple
            </button>
          </div>

          <div className="auth-switch">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={() =>
                setMode(isLogin ? "register" : "login")
              }
            >
              {isLogin ? "Create one" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="auth-feature">
      <div>{icon}</div>
      <span>{text}</span>
    </div>
  );
}

function Input({ label, placeholder, type = "text" }) {
  return (
    <label className="input-group">
      <span>{label}</span>
      <input type={type} placeholder={placeholder} />
    </label>
  );
}

/* =========================
   SIDEBAR
========================= */

function Sidebar({
  activePage,
  navigate,
  mobileOpen,
  onClose,
  onLogout,
}) {
  return (
    <aside
      className={`sidebar ${
        mobileOpen ? "sidebar-open" : ""
      }`}
    >
      <div className="sidebar-brand">
        <div className="brand-mark small">
          <HeartPulse size={19} />
        </div>

        <div>
          <strong>FitBuddy</strong>
          <span>Health & Wellness</span>
        </div>

        <button
          className="sidebar-close"
          onClick={onClose}
          type="button"
        >
          <X size={20} />
        </button>
      </div>

      <div className="nav-label">MAIN MENU</div>

      <nav className="main-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={`side-nav-item ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => navigate(item.id)}
              type="button"
            >
              <Icon size={18} />
              <span>{item.label}</span>

              {item.id === "coach" && (
                <span className="ai-badge">AI</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="nav-label account-label">ACCOUNT</div>

      <button
        className={`side-nav-item ${
          activePage === "profile" ? "active" : ""
        }`}
        onClick={() => navigate("profile")}
        type="button"
      >
        <User size={18} />
        <span>Profile</span>
      </button>

      <button
        className={`side-nav-item ${
          activePage === "settings" ? "active" : ""
        }`}
        onClick={() => navigate("settings")}
        type="button"
      >
        <Settings size={18} />
        <span>Settings</span>
      </button>

      <div className="sidebar-user">
        <div className="user-avatar">D</div>

        <div className="sidebar-user-info">
          <strong>Dhayanithi</strong>
          <span>Premium Member</span>
        </div>

        <MoreHorizontal size={18} />
      </div>

      <button
        className="logout-button"
        onClick={onLogout}
        type="button"
      >
        Sign out
      </button>
    </aside>
  );
}

/* =========================
   TOPBAR
========================= */

function Topbar({
  onMenu,
  onNotification,
  notifications,
  profile,
}) {
  return (
    <header className="topbar">
      <button
        className="mobile-menu"
        onClick={onMenu}
        type="button"
      >
        <Menu size={21} />
      </button>

      <div className="topbar-title">
        <span>HEALTH OVERVIEW</span>
        <strong>Good evening, {profile.name} 👋</strong>
      </div>

      <div className="topbar-actions">
        <div className="top-search">
          <span>⌕</span>
          <input placeholder="Search health data..." />
        </div>

        <button
          className={`notification-button ${
            notifications ? "active" : ""
          }`}
          onClick={onNotification}
          type="button"
        >
          <Bell size={18} />
          <i />
        </button>

        <div className="top-avatar">D</div>
      </div>
    </header>
  );
}

function NotificationPanel() {
  return (
    <div className="notification-panel">
      <div className="notification-header">
        <strong>Notifications</strong>
        <span>3 new</span>
      </div>

      <Notification
        icon="💧"
        title="Hydration reminder"
        text="You have 2 glasses left today."
      />

      <Notification
        icon="💪"
        title="Workout reminder"
        text="Your evening workout is waiting."
      />

      <Notification
        icon="🎯"
        title="Goal progress"
        text="You're 72% toward your weekly goal."
      />
    </div>
  );
}

function Notification({ icon, title, text }) {
  return (
    <div className="notification-row">
      <div className="notification-icon">{icon}</div>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

/* =========================
   PREMIUM OVERVIEW
========================= */

function Overview({
  profile,
  water,
  meals,
  navigate,
}) {
  const calories = meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  const hydration = Math.round((water / 8) * 100);

  return (
    <>
      <div className="page-heading">
        <div>
          <span>MONDAY · SEPTEMBER 28, 2026</span>
          <h1>Your health, at a glance.</h1>
          <p>
            Here's everything you need to know about your
            wellness today.
          </p>
        </div>

        <button
          className="primary-action"
          onClick={() => navigate("coach")}
        >
          <Sparkles size={16} />
          Ask AI Coach
        </button>
      </div>

      <div className="health-score-card">
        <div className="health-score-left">
          <div className="score-circle">
            <div>
              <strong>87</strong>
              <span>/100</span>
            </div>
          </div>

          <div>
            <span className="score-label">
              TODAY'S HEALTH SCORE
            </span>

            <h2>You're doing great!</h2>

            <p>
              Your overall health activity is above
              your weekly average.
            </p>
          </div>
        </div>

        <div className="score-metrics">
          <MiniScore
            label="Activity"
            value="82"
            icon={<Activity size={15} />}
          />

          <MiniScore
            label="Nutrition"
            value="91"
            icon={<Apple size={15} />}
          />

          <MiniScore
            label="Hydration"
            value={hydration}
            icon={<Droplets size={15} />}
          />

          <MiniScore
            label="Recovery"
            value="88"
            icon={<Moon size={15} />}
          />
        </div>
      </div>

      <div className="section-title-row">
        <div>
          <h2>Today's health</h2>
          <p>Your key health metrics</p>
        </div>
      </div>

      <div className="metric-grid">
        <HealthMetric
          icon={<HeartPulse size={21} />}
          iconClass="red"
          label="Heart Rate"
          value="72"
          unit="bpm"
          note="Normal resting range"
          status="Healthy"
        />

        <HealthMetric
          icon={<Activity size={21} />}
          iconClass="green"
          label="Daily Activity"
          value="7,240"
          unit="steps"
          note="2,760 steps remaining"
          status="72%"
        />

        <HealthMetric
          icon={<Droplets size={21} />}
          iconClass="blue"
          label="Hydration"
          value={water}
          unit="/ 8 glasses"
          note="250 ml per glass"
          status={`${hydration}%`}
        />

        <HealthMetric
          icon={<Zap size={21} />}
          iconClass="orange"
          label="Calories"
          value={calories}
          unit="kcal"
          note="Daily target 2,200"
          status={`${Math.min(
            Math.round((calories / 2200) * 100),
            100
          )}%`}
        />
      </div>

      <div className="two-column">
        <div className="panel">
          <PanelHeader
            title="Weekly activity"
            subtitle="Your activity over the last 7 days"
            action="This week"
          />

          <ActivityChart />
        </div>

        <div className="panel">
          <PanelHeader
            title="Today's wellness"
            subtitle="Your daily balance"
          />

          <WellnessItem
            icon={<Moon size={18} />}
            title="Sleep"
            value="7h 42m"
            progress={86}
            color="purple"
          />

          <WellnessItem
            icon={<Activity size={18} />}
            title="Activity"
            value="72%"
            progress={72}
            color="green"
          />

          <WellnessItem
            icon={<Apple size={18} />}
            title="Nutrition"
            value="91%"
            progress={91}
            color="orange"
          />

          <WellnessItem
            icon={<Droplets size={18} />}
            title="Hydration"
            value={`${hydration}%`}
            progress={hydration}
            color="blue"
          />
        </div>
      </div>

      <div className="two-column">
        <div className="panel">
          <PanelHeader
            title="Today's meals"
            subtitle={`${calories} calories consumed`}
            action="View all"
            onAction={() => navigate("nutrition")}
          />

          <div className="compact-list">
            {meals.slice(0, 4).map((meal) => (
              <div className="compact-row" key={meal.name}>
                <div className="meal-emoji">
                  {meal.icon}
                </div>

                <div className="compact-info">
                  <span>{meal.type}</span>
                  <strong>{meal.name}</strong>
                </div>

                <strong className="compact-value">
                  {meal.calories} kcal
                </strong>

                <ChevronRight
                  size={16}
                  className="muted-icon"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="panel coach-mini">
          <div className="coach-mini-icon">
            <Sparkles size={22} />
          </div>

          <div>
            <span>AI HEALTH COACH</span>
            <h3>Need help with your health?</h3>

            <p>
              Ask me about nutrition, workouts,
              hydration or your daily routine.
            </p>

            <button onClick={() => navigate("coach")}>
              Talk to AI Coach
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="two-column">
        <div className="panel">
          <PanelHeader
            title="Today's goals"
            subtitle="Keep your momentum going"
          />

          <GoalMini
            title="Daily steps"
            current="7,240"
            target="10,000"
            percent={72}
          />

          <GoalMini
            title="Water intake"
            current={`${water}`}
            target="8 glasses"
            percent={hydration}
          />

          <GoalMini
            title="Workout"
            current="1"
            target="1 session"
            percent={100}
          />
        </div>

        <div className="panel">
          <PanelHeader
            title="AI daily insight"
            subtitle="Personalized wellness summary"
          />

          <div className="daily-insight">
            <div className="insight-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <strong>You're building a strong routine.</strong>
              <p>
                Your activity and nutrition are on track.
                Try drinking {8 - water} more glass
                {8 - water === 1 ? "" : "es"} of water
                today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function MiniScore({ label, value, icon }) {
  return (
    <div className="mini-score">
      <div className="mini-score-icon">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function HealthMetric({
  icon,
  iconClass,
  label,
  value,
  unit,
  note,
  status,
}) {
  return (
    <div className="health-metric">
      <div className="metric-top">
        <div className={`metric-icon ${iconClass}`}>
          {icon}
        </div>

        <span className="metric-status">
          {status}
        </span>
      </div>

      <span className="metric-label">{label}</span>

      <div className="metric-number">
        <strong>{value}</strong>
        <span>{unit}</span>
      </div>

      <p>{note}</p>
    </div>
  );
}

function GoalMini({
  title,
  current,
  target,
  percent,
}) {
  return (
    <div className="goal-mini">
      <div className="goal-mini-top">
        <span>{title}</span>
        <strong>{percent}%</strong>
      </div>

      <div className="goal-mini-values">
        <strong>{current}</strong>
        <span>/ {target}</span>
      </div>

      <div className="goal-mini-track">
        <div style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function PanelHeader({
  title,
  subtitle,
  action,
  onAction,
}) {
  return (
    <div className="panel-header">
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>

      {action && (
        <button onClick={onAction} type="button">
          {action}
          <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

function WellnessItem({
  icon,
  title,
  value,
  progress,
  color,
}) {
  return (
    <div className="wellness-item">
      <div className={`wellness-icon ${color}`}>
        {icon}
      </div>

      <div className="wellness-content">
        <div>
          <span>{title}</span>
          <strong>{value}</strong>
        </div>

        <div className="wellness-track">
          <div
            className={color}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function ActivityChart() {
  return (
    <div className="activity-chart">
      <div className="chart-values">
        <span>100</span>
        <span>75</span>
        <span>50</span>
        <span>25</span>
        <span>0</span>
      </div>

      <div className="chart-body">
        {[0, 25, 50, 75].map((item) => (
          <div
            className="chart-line"
            key={item}
            style={{ top: `${item}%` }}
          />
        ))}

        <div className="chart-bars">
          {activityData.map((item) => (
            <div className="chart-column" key={item.day}>
              <div className="chart-tooltip">
                {item.value}%
              </div>

              <div
                className="chart-bar"
                style={{ height: `${item.value}%` }}
              />

              <span>{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================
   HEALTH
========================= */

function HealthPage({ profile }) {
  return (
    <>
      <PageTitle
        eyebrow="HEALTH"
        title="Your health overview"
        description="Monitor your key health indicators."
      />

      <div className="health-overview-grid">
        <div className="panel health-main">
          <div className="health-ring">
            <div>
              <HeartPulse size={24} />
              <strong>87</strong>
              <span>Health Score</span>
            </div>
          </div>

          <h2>Overall health</h2>

          <p>
            Your current health indicators are within
            your tracked healthy ranges.
          </p>

          <div className="health-status">
            <Check size={15} />
            Good overall status
          </div>
        </div>

        <div className="panel">
          <PanelHeader
            title="Health indicators"
            subtitle="Today's measurements"
          />

          <HealthRow
            icon={<HeartPulse size={18} />}
            title="Resting heart rate"
            value="72 bpm"
            status="Normal"
          />

          <HealthRow
            icon={<Activity size={18} />}
            title="Daily steps"
            value="7,240"
            status="72%"
          />

          <HealthRow
            icon={<Moon size={18} />}
            title="Sleep"
            value="7h 42m"
            status="Good"
          />

          <HealthRow
            icon={<Droplets size={18} />}
            title="Hydration"
            value="1.5 L"
            status="75%"
          />
        </div>

        <div className="panel">
          <PanelHeader
            title="Body information"
            subtitle="Your current profile"
          />

          <BodyRow
            label="Age"
            value={`${profile.age} years`}
          />

          <BodyRow
            label="Height"
            value={`${profile.height} cm`}
          />

          <BodyRow
            label="Weight"
            value={`${profile.weight} kg`}
          />

          <BodyRow label="BMI" value="23.0" />
        </div>
      </div>

      <div className="medical-note">
        <ShieldCheck size={18} />

        <div>
          <strong>Health information notice</strong>
          <p>
            FitBuddy is designed for wellness tracking
            and general guidance. It does not replace
            professional medical advice.
          </p>
        </div>
      </div>
    </>
  );
}

function HealthRow({
  icon,
  title,
  value,
  status,
}) {
  return (
    <div className="health-row">
      <div className="health-row-icon">{icon}</div>

      <div>
        <strong>{title}</strong>
        <span>{value}</span>
      </div>

      <em>{status}</em>
    </div>
  );
}

function BodyRow({ label, value }) {
  return (
    <div className="body-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* =========================
   ACTIVITY
========================= */

function ActivityPage() {
  const workouts = [
    {
      name: "Full Body Strength",
      duration: "30 min",
      calories: "240 kcal",
      status: "Completed",
    },
    {
      name: "Morning Cardio",
      duration: "25 min",
      calories: "210 kcal",
      status: "Completed",
    },
    {
      name: "Core & Mobility",
      duration: "20 min",
      calories: "160 kcal",
      status: "Upcoming",
    },
    {
      name: "Evening Walk",
      duration: "35 min",
      calories: "180 kcal",
      status: "Upcoming",
    },
  ];

  return (
    <>
      <PageTitle
        eyebrow="ACTIVITY"
        title="Stay active, feel better."
        description="Track your workouts and daily movement."
      />

      <div className="activity-summary">
        <SummaryCard
          icon={<Activity size={20} />}
          title="Steps"
          value="7,240"
          note="72% of daily target"
        />

        <SummaryCard
          icon={<Clock3 size={20} />}
          title="Active time"
          value="54 min"
          note="Today"
        />

        <SummaryCard
          icon={<Zap size={20} />}
          title="Calories burned"
          value="486"
          note="Today"
        />

        <SummaryCard
          icon={<Award size={20} />}
          title="Workouts"
          value="18"
          note="This month"
        />
      </div>

      <div className="two-column">
        <div className="panel">
          <PanelHeader
            title="Weekly activity"
            subtitle="Movement trend"
          />
          <ActivityChart />
        </div>

        <div className="panel">
          <PanelHeader
            title="Activity goal"
            subtitle="Today's target"
          />

          <div className="large-progress">
            <div
              className="large-progress-circle"
              style={{ "--progress": "72%" }}
            >
              <strong>72%</strong>
            </div>

            <h3>7,240 / 10,000 steps</h3>
            <p>2,760 steps remaining</p>

            <button className="primary-action" type="button">
              <Plus size={15} />
              Add activity
            </button>
          </div>
        </div>
      </div>

      <div className="panel">
        <PanelHeader
          title="Workout history"
          subtitle="Your recent workouts"
        />

        <div className="workout-table">
          {workouts.map((workout) => (
            <div
              className="workout-table-row"
              key={workout.name}
            >
              <div className="workout-symbol">
                <Activity size={18} />
              </div>

              <div>
                <strong>{workout.name}</strong>
                <span>
                  {workout.duration} · {workout.calories}
                </span>
              </div>

              <span
                className={`workout-status ${
                  workout.status === "Completed"
                    ? "completed"
                    : "upcoming"
                }`}
              >
                {workout.status}
              </span>

              <ChevronRight size={16} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SummaryCard({
  icon,
  title,
  value,
  note,
}) {
  return (
    <div className="summary-card">
      <div className="summary-icon">{icon}</div>
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </div>
  );
}

/* =========================
   NUTRITION
========================= */

function NutritionPage({ meals, setMeals }) {
  const calories = meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );

  const addMeal = () => {
    setMeals([
      ...meals,
      {
        type: "Snack",
        name: "Protein Snack",
        calories: 180,
        protein: 14,
        icon: "🥛",
      },
    ]);
  };

  return (
    <>
      <PageTitle
        eyebrow="NUTRITION"
        title="Fuel your body."
        description="Understand what you're eating and make healthier choices."
        action={
          <button
            className="primary-action"
            onClick={addMeal}
          >
            <Plus size={16} />
            Add meal
          </button>
        }
      />

      <div className="nutrition-summary-grid">
        <NutritionSummary
          label="Calories"
          value={calories}
          target="2,200 kcal"
          percent={(calories / 2200) * 100}
          className="orange"
        />

        <NutritionSummary
          label="Protein"
          value="103g"
          target="150g"
          percent={68}
          className="green"
        />

        <NutritionSummary
          label="Carbs"
          value="159g"
          target="220g"
          percent={72}
          className="blue"
        />

        <NutritionSummary
          label="Healthy fats"
          value="58g"
          target="95g"
          percent={61}
          className="purple"
        />
      </div>

      <div className="two-column">
        <div className="panel">
          <PanelHeader
            title="Today's meals"
            subtitle={`${calories} calories consumed`}
          />

          <div className="meal-list">
            {meals.map((meal, index) => (
              <div
                className="meal-list-row"
                key={`${meal.name}-${index}`}
              >
                <div className="meal-image">
                  {meal.icon}
                </div>

                <div className="meal-list-info">
                  <span>{meal.type}</span>
                  <strong>{meal.name}</strong>
                </div>

                <div className="meal-protein">
                  <span>Protein</span>
                  <strong>{meal.protein}g</strong>
                </div>

                <strong className="meal-kcal">
                  {meal.calories} kcal
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel nutrition-tip">
          <div className="tip-icon">
            <Apple size={21} />
          </div>

          <span>AI NUTRITION TIP</span>

          <h3>
            Add more protein to your breakfast.
          </h3>

          <p>
            A protein-rich breakfast can help support
            fullness and your daily nutrition goals.
          </p>

          <button type="button">
            Explore nutrition
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </>
  );
}

function NutritionSummary({
  label,
  value,
  target,
  percent,
  className,
}) {
  return (
    <div className="nutrition-summary-card">
      <div className="nutrition-summary-top">
        <span>{label}</span>
        <div className={`nutrition-dot ${className}`} />
      </div>

      <strong>{value}</strong>
      <small>of {target}</small>

      <div className="nutrition-progress">
        <div
          className={className}
          style={{
            width: `${Math.min(percent, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

/* =========================
   HYDRATION
========================= */

function HydrationPage({
  water,
  setWater,
}) {
  const increase = () =>
    setWater((value) => Math.min(value + 1, 8));

  const decrease = () =>
    setWater((value) => Math.max(value - 1, 0));

  return (
    <>
      <PageTitle
        eyebrow="HYDRATION"
        title="Stay hydrated."
        description="Small sips throughout the day make a big difference."
      />

      <div className="hydration-grid">
        <div className="panel hydration-main">
          <div className="water-ring">
            <div>
              <Droplets size={25} />
              <strong>{water}</strong>
              <span>of 8 glasses</span>
            </div>
          </div>

          <h2>
            {water >= 8
              ? "Daily goal complete! 🎉"
              : `${8 - water} glasses remaining`}
          </h2>

          <p>
            Your recommended daily intake is
            approximately 2 liters.
          </p>

          <div className="water-controls">
            <button onClick={decrease}>−</button>

            <span>{water * 250} ml</span>

            <button onClick={increase}>+</button>
          </div>
        </div>

        <div className="panel">
          <PanelHeader
            title="Today's hydration"
            subtitle="250 ml per glass"
          />

          <div className="glass-grid">
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <button
                  key={index}
                  className={`glass-item ${
                    index < water ? "filled" : ""
                  }`}
                  onClick={() => setWater(index + 1)}
                >
                  <Droplets size={21} />
                  <span>{index + 1}</span>
                </button>
              )
            )}
          </div>

          <div className="hydration-tip-box">
            <Droplets size={18} />

            <div>
              <strong>Hydration tip</strong>
              <p>
                Keep a water bottle nearby and take
                regular sips during the day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================
   PROGRESS
========================= */

function ProgressPage() {
  return (
    <>
      <PageTitle
        eyebrow="PROGRESS"
        title="See your progress."
        description="Your consistency is building healthier habits."
      />

      <div className="progress-summary">
        <SummaryCard
          icon={<TrendingUp size={20} />}
          title="Weekly progress"
          value="+12%"
          note="Compared with last week"
        />

        <SummaryCard
          icon={<Activity size={20} />}
          title="Workouts"
          value="18"
          note="This month"
        />

        <SummaryCard
          icon={<WeightIcon />}
          title="Weight"
          value="68 kg"
          note="4 kg progress"
        />

        <SummaryCard
          icon={<Award size={20} />}
          title="Consistency"
          value="82%"
          note="Last 30 days"
        />
      </div>

      <div className="two-column">
        <div className="panel">
          <PanelHeader
            title="Activity progress"
            subtitle="Last 7 days"
          />
          <ActivityChart />
        </div>

        <div className="panel">
          <PanelHeader
            title="Weight journey"
            subtitle="Your target progress"
          />

          <div className="weight-progress">
            <div className="weight-values">
              <div>
                <span>Starting</span>
                <strong>72 kg</strong>
              </div>

              <div>
                <span>Current</span>
                <strong>68 kg</strong>
              </div>

              <div>
                <span>Goal</span>
                <strong>64 kg</strong>
              </div>
            </div>

            <div className="weight-track">
              <div />
            </div>

            <div className="achievement">
              <Award size={22} />

              <div>
                <strong>Great consistency!</strong>
                <p>
                  You've made steady progress toward
                  your goal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function WeightIcon() {
  return <span className="weight-icon">kg</span>;
}

/* =========================
   GOALS
========================= */

function GoalsPage() {
  const goals = [
    {
      title: "Daily Steps",
      current: "7,240",
      target: "10,000",
      percent: 72,
      icon: <Activity size={21} />,
    },
    {
      title: "Drink Water",
      current: "6",
      target: "8 glasses",
      percent: 75,
      icon: <Droplets size={21} />,
    },
    {
      title: "Weekly Workouts",
      current: "4",
      target: "5 workouts",
      percent: 80,
      icon: <Activity size={21} />,
    },
    {
      title: "Weight Goal",
      current: "68",
      target: "64 kg",
      percent: 50,
      icon: <Target size={21} />,
    },
  ];

  return (
    <>
      <PageTitle
        eyebrow="GOALS"
        title="Build better habits."
        description="Set meaningful goals and keep moving forward."
        action={
          <button className="primary-action">
            <Plus size={16} />
            New goal
          </button>
        }
      />

      <div className="goals-grid">
        {goals.map((goal) => (
          <div className="goal-card" key={goal.title}>
            <div className="goal-card-header">
              <div className="goal-icon">
                {goal.icon}
              </div>

              <button className="more-button">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <span>GOAL</span>
            <h3>{goal.title}</h3>

            <div className="goal-values">
              <strong>{goal.current}</strong>
              <small>/ {goal.target}</small>
            </div>

            <div className="goal-progress">
              <div
                style={{
                  width: `${goal.percent}%`,
                }}
              />
            </div>

            <div className="goal-percent">
              <span>Progress</span>
              <strong>{goal.percent}%</strong>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================
   AI COACH
========================= */

function CoachPage() {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text:
        "Hi Dhayanithi 👋 I'm your FitBuddy AI Health Coach. How can I help you today?",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = message.trim();

    setMessages((current) => [
      ...current,
      {
        type: "user",
        text: userMessage,
      },
      {
        type: "ai",
        text:
          "That's a great question. I can help you understand your wellness habits and create a practical routine. For medical concerns, please consult a qualified healthcare professional.",
      },
    ]);

    setMessage("");
  };

  return (
    <>
      <PageTitle
        eyebrow="AI HEALTH COACH"
        title="Your personal wellness companion."
        description="Ask questions about your fitness, nutrition and healthy habits."
      />

      <div className="coach-layout">
        <div className="coach-chat panel">
          <div className="coach-chat-header">
            <div className="coach-avatar">
              <Sparkles size={19} />
            </div>

            <div>
              <strong>FitBuddy AI Coach</strong>

              <span>
                <i />
                Online
              </span>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`chat-message ${item.type}`}
              >
                {item.type === "ai" && (
                  <div className="chat-ai-icon">
                    <Sparkles size={14} />
                  </div>
                )}

                <div className="chat-bubble">
                  {item.text}
                </div>
              </div>
            ))}
          </div>

          <div className="chat-suggestions">
            <button
              onClick={() =>
                setMessage(
                  "How can I improve my hydration?"
                )
              }
            >
              💧 Improve hydration
            </button>

            <button
              onClick={() =>
                setMessage(
                  "Give me a simple workout plan"
                )
              }
            >
              💪 Workout plan
            </button>

            <button
              onClick={() =>
                setMessage("What should I eat today?")
              }
            >
              🍎 Nutrition
            </button>
          </div>

          <div className="chat-input">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask your health coach..."
            />

            <button onClick={sendMessage}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="coach-side">
          <div className="panel coach-profile">
            <div className="coach-large-icon">
              <Sparkles size={29} />
            </div>

            <h3>Your AI wellness coach</h3>

            <p>
              Get personalized guidance based on your
              daily wellness activity.
            </p>

            {[
              "Fitness guidance",
              "Nutrition insights",
              "Hydration reminders",
              "Habit building",
            ].map((item) => (
              <div className="coach-capability" key={item}>
                <Check size={15} />
                {item}
              </div>
            ))}
          </div>

          <div className="medical-note">
            <ShieldCheck size={18} />

            <div>
              <strong>Important</strong>
              <p>
                AI guidance is for general wellness
                information and is not medical diagnosis
                or treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================
   PROFILE
========================= */

function ProfilePage({
  profile,
  setProfile,
}) {
  const update = (field, value) => {
    setProfile({
      ...profile,
      [field]: value,
    });
  };

  return (
    <>
      <PageTitle
        eyebrow="PROFILE"
        title="Your profile."
        description="Keep your wellness information up to date."
      />

      <div className="profile-layout">
        <div className="panel profile-card">
          <div className="profile-avatar">D</div>

          <h2>{profile.name}</h2>
          <p>{profile.email}</p>

          <div className="premium-tag">
            <Award size={14} />
            Premium Member
          </div>

          <div className="profile-stats">
            <div>
              <strong>{profile.weight}</strong>
              <span>kg</span>
            </div>

            <div>
              <strong>{profile.height}</strong>
              <span>cm</span>
            </div>

            <div>
              <strong>{profile.age}</strong>
              <span>years</span>
            </div>
          </div>
        </div>

        <div className="panel">
          <PanelHeader
            title="Personal information"
            subtitle="Update your profile details"
          />

          <div className="profile-form">
            <FormField
              label="Full name"
              value={profile.name}
              onChange={(value) => update("name", value)}
            />

            <FormField
              label="Email"
              value={profile.email}
              onChange={(value) => update("email", value)}
            />

            <FormField
              label="Age"
              value={profile.age}
              onChange={(value) => update("age", value)}
            />

            <FormField
              label="Height"
              value={profile.height}
              onChange={(value) => update("height", value)}
              suffix="cm"
            />

            <FormField
              label="Weight"
              value={profile.weight}
              onChange={(value) => update("weight", value)}
              suffix="kg"
            />
          </div>

          <button className="primary-action">
            <Check size={16} />
            Save changes
          </button>
        </div>
      </div>
    </>
  );
}

function FormField({
  label,
  value,
  onChange,
  suffix,
}) {
  return (
    <label className="form-field">
      <span>{label}</span>

      <div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {suffix && <small>{suffix}</small>}
      </div>
    </label>
  );
}

/* =========================
   SETTINGS
========================= */

function SettingsPage() {
  return (
    <>
      <PageTitle
        eyebrow="SETTINGS"
        title="Settings."
        description="Manage your FitBuddy preferences."
      />

      <div className="settings-panel panel">
        <SettingRow
          icon={<Bell size={18} />}
          title="Health reminders"
          description="Get reminders for water, workouts and wellness."
          enabled
        />

        <SettingRow
          icon={<Moon size={18} />}
          title="Sleep reminders"
          description="Receive a reminder when it is time to wind down."
          enabled
        />

        <SettingRow
          icon={<ShieldCheck size={18} />}
          title="Privacy protection"
          description="Keep your wellness information private."
          enabled
        />

        <SettingRow
          icon={<Users size={18} />}
          title="Personalized insights"
          description="Allow FitBuddy to personalize your dashboard."
          enabled
        />
      </div>
    </>
  );
}

function SettingRow({
  icon,
  title,
  description,
  enabled,
}) {
  const [active, setActive] = useState(enabled);

  return (
    <div className="setting-row">
      <div className="setting-icon">{icon}</div>

      <div className="setting-info">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <button
        className={`toggle ${active ? "on" : ""}`}
        onClick={() => setActive(!active)}
      >
        <i />
      </button>
    </div>
  );
}

/* =========================
   PAGE TITLE
========================= */

function PageTitle({
  eyebrow,
  title,
  description,
  action,
}) {
  return (
    <div className="page-title">
      <div>
        <span>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {action}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);