<template>
  <div class="dashboard-root">

    <!-- ── Sidebar ─────────────────────────────────────────────────── -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar__top">
        <a href="/" class="sidebar__logo">
          <span class="logo-hex">⬡</span>
          <span class="logo-word" v-if="!sidebarCollapsed">Kath<span class="logo-accent">rah</span></span>
        </a>
        <button class="sidebar__toggle" @click="sidebarCollapsed = !sidebarCollapsed" aria-label="Toggle sidebar">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3 L5 8 L10 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              :style="{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'none', transformOrigin: '7.5px 8px', transition: 'transform 0.3s' }"/>
          </svg>
        </button>
      </div>

      <nav class="sidebar__nav">
        <div class="nav-section-label" v-if="!sidebarCollapsed">Overview</div>
        <a v-for="item in navItems.slice(0,3)" :key="item.id"
          class="nav-item" :class="{ active: activeSection === item.id }"
          @click="activeSection = item.id" href="#">
          <span class="nav-item__icon" v-html="item.icon"></span>
          <span class="nav-item__label" v-if="!sidebarCollapsed">{{ item.label }}</span>
          <span class="nav-item__badge" v-if="item.badge && !sidebarCollapsed">{{ item.badge }}</span>
        </a>

        <div class="nav-section-label" v-if="!sidebarCollapsed">Engage</div>
        <a v-for="item in navItems.slice(3)" :key="item.id"
          class="nav-item" :class="{ active: activeSection === item.id }"
          @click="activeSection = item.id" href="#">
          <span class="nav-item__icon" v-html="item.icon"></span>
          <span class="nav-item__label" v-if="!sidebarCollapsed">{{ item.label }}</span>
          <span class="nav-item__badge" v-if="item.badge && !sidebarCollapsed">{{ item.badge }}</span>
        </a>
      </nav>

      <div class="sidebar__user">
        <div class="user-avatar">{{ userInitials }}</div>
        <div class="user-info" v-if="!sidebarCollapsed">
          <p class="user-name">{{ user.name }}</p>
          <p class="user-role">{{ user.role }}</p>
        </div>
        <button class="user-logout" v-if="!sidebarCollapsed" @click="logout" title="Sign out">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
        </button>
      </div>
    </aside>

    <!-- ── Main ────────────────────────────────────────────────────── -->
    <main class="main">

      <!-- Topbar -->
      <header class="topbar">
        <div class="topbar__left">
          <h1 class="topbar__title">{{ currentSection.label }}</h1>
          <p class="topbar__sub">{{ currentSection.subtitle }}</p>
        </div>
        <div class="topbar__right">
          <div class="topbar__search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="Search scholars, topics…" v-model="searchQuery" />
          </div>
          <button class="topbar__notif" @click="showNotifications = !showNotifications">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span class="notif-dot" v-if="notifications.length"></span>
          </button>
        </div>
      </header>

      <!-- Notifications dropdown -->
      <transition name="fade">
        <div class="notif-panel" v-if="showNotifications" v-click-outside="() => showNotifications = false">
          <div class="notif-panel__header">
            <span>Notifications</span>
            <button @click="notifications = []">Clear all</button>
          </div>
          <div class="notif-item" v-for="n in notifications" :key="n.id">
            <div class="notif-icon" v-html="n.icon"></div>
            <div>
              <p class="notif-msg">{{ n.message }}</p>
              <p class="notif-time">{{ n.time }}</p>
            </div>
          </div>
          <p class="notif-empty" v-if="!notifications.length">All caught up ✓</p>
        </div>
      </transition>

      <!-- ── OVERVIEW ────────────────────────────────────────────── -->
      <section class="content" v-if="activeSection === 'overview'">

        <!-- Welcome banner -->
        <div class="welcome-banner">
          <div class="welcome-banner__text">
            <p class="welcome-eyebrow">بسم الله الرحمن الرحيم</p>
            <h2>Peace be upon you, {{ user.name.split(' ')[0] }}.</h2>
            <p>Your profile is <strong>{{ user.completeness }}% complete.</strong> Complete it to connect with more scholars.</p>
            <button class="btn-gold" @click="activeSection = 'profile'">Complete Profile →</button>
          </div>
          <div class="welcome-banner__art">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="banner-hex-art">
              <polygon points="100,8 185,53 185,148 100,193 15,148 15,53" stroke="#c9a84c" stroke-width="2" fill="none" opacity="0.4"/>
              <polygon points="100,28 165,63 165,138 100,173 35,138 35,63" stroke="#c9a84c" stroke-width="1.5" fill="none" opacity="0.25"/>
              <polygon points="100,48 145,73 145,128 100,153 55,128 55,73" stroke="#c9a84c" stroke-width="1" fill="none" opacity="0.15"/>
              <circle cx="100" cy="100" r="18" stroke="#c9a84c" stroke-width="1.5" fill="rgba(201,168,76,0.08)"/>
              <circle cx="100" cy="100" r="5" fill="#c9a84c" opacity="0.5"/>
            </svg>
          </div>
        </div>

        <!-- Stats row -->
        <div class="stats-row">
          <div class="stat-card" v-for="stat in stats" :key="stat.label">
            <div class="stat-card__icon" v-html="stat.icon"></div>
            <div class="stat-card__body">
              <p class="stat-card__value">{{ stat.value }}</p>
              <p class="stat-card__label">{{ stat.label }}</p>
            </div>
            <div class="stat-card__trend" :class="stat.trend > 0 ? 'up' : 'down'">
              {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
            </div>
          </div>
        </div>

        <!-- Two-column: activity + quick actions -->
        <div class="overview-grid">
          <div class="card">
            <div class="card__header">
              <h3>Recent Activity</h3>
              <a href="#" class="card__link" @click.prevent="activeSection = 'mentorship'">View all</a>
            </div>
            <div class="activity-list">
              <div class="activity-item" v-for="act in recentActivity" :key="act.id">
                <div class="activity-item__dot" :class="act.type"></div>
                <div class="activity-item__body">
                  <p class="activity-item__text">{{ act.text }}</p>
                  <p class="activity-item__time">{{ act.time }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card__header"><h3>Quick Actions</h3></div>
            <div class="quick-actions">
              <button class="quick-action" v-for="qa in quickActions" :key="qa.label"
                @click="activeSection = qa.target">
                <span class="quick-action__icon" v-html="qa.icon"></span>
                <span>{{ qa.label }}</span>
              </button>
            </div>

            <div class="card__divider"></div>

            <div class="card__header"><h3>Profile Completeness</h3></div>
            <div class="completeness-list">
              <div class="completeness-item" v-for="item in completenessItems" :key="item.label">
                <div class="completeness-item__check" :class="{ done: item.done }">
                  <svg v-if="item.done" width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span :class="{ done: item.done }">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Scholar spotlight -->
        <div class="card">
          <div class="card__header">
            <h3>Scholars to Connect With</h3>
            <a href="#" class="card__link" @click.prevent="activeSection = 'mentorship'">Find mentors</a>
          </div>
          <div class="scholars-row">
            <div class="scholar-card" v-for="s in suggestedScholars" :key="s.name">
              <div class="scholar-card__avatar">{{ s.initials }}</div>
              <div class="scholar-card__info">
                <p class="scholar-card__name">{{ s.name }}</p>
                <p class="scholar-card__field">{{ s.field }}</p>
                <p class="scholar-card__location">{{ s.location }}</p>
              </div>
              <div class="scholar-card__tags">
                <span class="tag" v-for="t in s.tags" :key="t">{{ t }}</span>
              </div>
              <button class="btn-outline-sm">Connect</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ── PROFILE ─────────────────────────────────────────────── -->
      <section class="content" v-if="activeSection === 'profile'">
        <div class="profile-layout">
          <!-- Profile card -->
          <div class="profile-card card">
            <div class="profile-card__cover"></div>
            <div class="profile-card__body">
              <div class="profile-avatar-wrap">
                <div class="profile-avatar">{{ userInitials }}</div>
                <button class="profile-avatar__edit">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
              </div>
              <h2 class="profile-name">{{ user.name }}</h2>
              <p class="profile-role-badge">{{ user.role }}</p>
              <p class="profile-bio">{{ user.bio }}</p>
              <div class="profile-meta">
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> {{ user.location }}</span>
                <span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> {{ user.institution }}</span>
              </div>
              <div class="profile-stats">
                <div><strong>12</strong><span>Connections</span></div>
                <div><strong>3</strong><span>Publications</span></div>
                <div><strong>2</strong><span>Sessions</span></div>
              </div>
            </div>
          </div>

          <!-- Edit form -->
          <div class="card profile-form-card">
            <div class="card__header"><h3>Edit Profile</h3></div>
            <div class="form-grid">
              <div class="form-field">
                <label>Full Name</label>
                <input type="text" v-model="user.name" />
              </div>
              <div class="form-field">
                <label>User Type</label>
                <select v-model="user.role">
                  <option>Researcher / Postgraduate</option>
                  <option>Mentor</option>
                  <option>Student / Young Professional</option>
                  <option>Professional & Thought Leader</option>
                </select>
              </div>
              <div class="form-field full">
                <label>Bio</label>
                <textarea v-model="user.bio" rows="3"></textarea>
              </div>
              <div class="form-field">
                <label>Location</label>
                <input type="text" v-model="user.location" />
              </div>
              <div class="form-field">
                <label>Institution</label>
                <input type="text" v-model="user.institution" />
              </div>
              <div class="form-field full">
                <label>Research Interests (comma separated)</label>
                <input type="text" v-model="researchTagsInput" placeholder="Islamic Ethics, AI, Public Policy…"/>
              </div>
              <div class="form-field">
                <label>Available for Mentorship</label>
                <div class="toggle-row">
                  <button class="toggle" :class="{ on: user.availableForMentorship }"
                    @click="user.availableForMentorship = !user.availableForMentorship">
                    <span class="toggle__knob"></span>
                  </button>
                  <span>{{ user.availableForMentorship ? 'Yes' : 'No' }}</span>
                </div>
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-teal">Save Changes</button>
              <button class="btn-ghost-sm">Discard</button>
            </div>
          </div>
        </div>

        <!-- Publications -->
        <div class="card" style="margin-top:1.5rem">
          <div class="card__header">
            <h3>Publications & Works</h3>
            <button class="btn-gold-sm">+ Add</button>
          </div>
          <div class="pub-list">
            <div class="pub-item" v-for="p in publications" :key="p.title">
              <div class="pub-item__type" :class="p.type">{{ p.type }}</div>
              <div class="pub-item__body">
                <p class="pub-item__title">{{ p.title }}</p>
                <p class="pub-item__meta">{{ p.journal }} · {{ p.year }}</p>
              </div>
              <a :href="p.url" class="pub-item__link">View →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ── MENTORSHIP ──────────────────────────────────────────── -->
      <section class="content" v-if="activeSection === 'mentorship'">
        <div class="tabs">
          <button v-for="tab in mentorshipTabs" :key="tab"
            class="tab" :class="{ active: mentorTab === tab }"
            @click="mentorTab = tab">{{ tab }}</button>
        </div>

        <!-- Find a Mentor tab -->
        <div v-if="mentorTab === 'Find a Mentor'">
          <div class="filter-bar">
            <select v-model="mentorFilter.field"><option value="">All Fields</option><option>Islamic Law</option><option>Economics</option><option>Education</option><option>Philosophy</option><option>Technology</option></select>
            <select v-model="mentorFilter.country"><option value="">All Countries</option><option>South Africa</option><option>Nigeria</option><option>Egypt</option><option>Malaysia</option><option>UK</option></select>
            <select v-model="mentorFilter.mode"><option value="">Any Mode</option><option>Video Call</option><option>Email</option><option>In-Person</option></select>
            <button class="btn-teal-sm">Search</button>
          </div>
          <div class="mentor-grid">
            <div class="mentor-card card" v-for="m in mentors" :key="m.name">
              <div class="mentor-card__top">
                <div class="mentor-avatar">{{ m.initials }}</div>
                <div>
                  <p class="mentor-name">{{ m.name }}</p>
                  <p class="mentor-title">{{ m.title }}</p>
                  <p class="mentor-loc">{{ m.location }}</p>
                </div>
                <div class="mentor-avail" :class="{ available: m.available }">
                  {{ m.available ? 'Available' : 'Busy' }}
                </div>
              </div>
              <p class="mentor-bio">{{ m.bio }}</p>
              <div class="mentor-tags">
                <span class="tag" v-for="t in m.tags" :key="t">{{ t }}</span>
              </div>
              <div class="mentor-footer">
                <span class="mentor-mode">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.55 5.55l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></svg>
                  {{ m.mode }}
                </span>
                <button class="btn-gold-sm" :disabled="!m.available">Request Session</button>
              </div>
            </div>
          </div>
        </div>

        <!-- My Sessions tab -->
        <div v-if="mentorTab === 'My Sessions'">
          <div class="sessions-list">
            <div class="session-item card" v-for="s in sessions" :key="s.id">
              <div class="session-item__status" :class="s.status">{{ s.status }}</div>
              <div class="session-avatar">{{ s.mentorInitials }}</div>
              <div class="session-body">
                <p class="session-mentor">{{ s.mentor }}</p>
                <p class="session-topic">{{ s.topic }}</p>
                <p class="session-date">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {{ s.date }}
                </p>
              </div>
              <div class="session-actions">
                <button class="btn-ghost-sm" v-if="s.status === 'upcoming'">Reschedule</button>
                <button class="btn-teal-sm" v-if="s.status === 'upcoming'">Join</button>
                <button class="btn-ghost-sm" v-if="s.status === 'completed'">Leave Feedback</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Requests tab -->
        <div v-if="mentorTab === 'Requests'">
          <div class="requests-list">
            <div class="request-item card" v-for="r in mentorRequests" :key="r.id">
              <div class="mentor-avatar sm">{{ r.fromInitials }}</div>
              <div class="request-body">
                <p class="request-from">{{ r.from }}</p>
                <p class="request-msg">{{ r.message }}</p>
                <p class="request-time">{{ r.time }}</p>
              </div>
              <div class="request-actions">
                <button class="btn-teal-sm">Accept</button>
                <button class="btn-ghost-sm">Decline</button>
              </div>
            </div>
            <div class="empty-state" v-if="!mentorRequests.length">
              <p>No pending requests.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── REPOSITORY ──────────────────────────────────────────── -->
      <section class="content" v-if="activeSection === 'repository'">
        <div class="filter-bar">
          <select v-model="repoFilter"><option value="">All Types</option><option>Article</option><option>Book Review</option><option>Research Paper</option><option>Video</option></select>
          <input type="text" placeholder="Search resources…" v-model="repoSearch" />
          <button class="btn-gold-sm">+ Submit Resource</button>
        </div>
        <div class="repo-grid">
          <div class="repo-card card" v-for="r in filteredResources" :key="r.title">
            <div class="repo-card__type" :class="r.type.toLowerCase().replace(' ','-')">{{ r.type }}</div>
            <h4 class="repo-card__title">{{ r.title }}</h4>
            <p class="repo-card__author">{{ r.author }} · {{ r.year }}</p>
            <p class="repo-card__excerpt">{{ r.excerpt }}</p>
            <div class="repo-card__tags">
              <span class="tag" v-for="t in r.tags" :key="t">{{ t }}</span>
            </div>
            <div class="repo-card__footer">
              <button class="btn-ghost-sm" @click="r.saved = !r.saved">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" :stroke="r.saved ? '#c9a84c' : 'currentColor'" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                {{ r.saved ? 'Saved' : 'Save' }}
              </button>
              <a href="#" class="btn-teal-sm">Read →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ── COMMUNITY ───────────────────────────────────────────── -->
      <section class="content" v-if="activeSection === 'community'">
        <div class="community-layout">
          <div class="forum-main">
            <div class="filter-bar">
              <select v-model="forumCategory">
                <option value="">All Topics</option>
                <option v-for="c in forumCategories" :key="c">{{ c }}</option>
              </select>
              <button class="btn-gold">+ New Discussion</button>
            </div>
            <div class="forum-list">
              <div class="forum-thread card" v-for="t in forumThreads" :key="t.id">
                <div class="thread-votes">
                  <button @click="t.votes++">▲</button>
                  <span>{{ t.votes }}</span>
                  <button @click="t.votes > 0 && t.votes--">▼</button>
                </div>
                <div class="thread-body">
                  <div class="thread-tags">
                    <span class="tag" v-for="tag in t.tags" :key="tag">{{ tag }}</span>
                  </div>
                  <h4 class="thread-title">{{ t.title }}</h4>
                  <p class="thread-excerpt">{{ t.excerpt }}</p>
                  <div class="thread-meta">
                    <span class="thread-author">{{ t.author }}</span>
                    <span>·</span>
                    <span>{{ t.time }}</span>
                    <span>·</span>
                    <span>{{ t.replies }} replies</span>
                  </div>
                </div>
                <button class="btn-ghost-sm thread-reply">Reply</button>
              </div>
            </div>
          </div>

          <div class="forum-sidebar">
            <div class="card">
              <div class="card__header"><h3>Top Contributors</h3></div>
              <div class="contributor-list">
                <div class="contributor" v-for="c in topContributors" :key="c.name">
                  <div class="contributor-avatar">{{ c.initials }}</div>
                  <div>
                    <p class="contributor-name">{{ c.name }}</p>
                    <p class="contributor-pts">{{ c.points }} pts</p>
                  </div>
                  <span class="contributor-badge">{{ c.badge }}</span>
                </div>
              </div>
            </div>
            <div class="card" style="margin-top:1rem">
              <div class="card__header"><h3>Categories</h3></div>
              <div class="cat-list">
                <a href="#" class="cat-item" v-for="c in forumCategories" :key="c"
                  @click.prevent="forumCategory = c" :class="{ active: forumCategory === c }">
                  {{ c }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── ANALYTICS ───────────────────────────────────────────── -->
      <section class="content" v-if="activeSection === 'analytics'">
        <div class="analytics-grid">
          <div class="card analytics-card" v-for="m in analyticsMetrics" :key="m.label">
            <p class="analytics-label">{{ m.label }}</p>
            <p class="analytics-value">{{ m.value }}</p>
            <p class="analytics-sub">{{ m.sub }}</p>
          </div>
        </div>

        <div class="card" style="margin-top:1.5rem">
          <div class="card__header"><h3>Profile Views (Last 30 Days)</h3></div>
          <div class="bar-chart">
            <div class="bar-chart__bars">
              <div class="bar-wrap" v-for="(v, i) in viewsData" :key="i">
                <div class="bar" :style="{ height: (v / Math.max(...viewsData) * 100) + '%' }"></div>
                <span class="bar-label">{{ barLabels[i] }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="analytics-row">
          <div class="card">
            <div class="card__header"><h3>Engagement Badges</h3></div>
            <div class="badges-grid">
              <div class="badge-item" v-for="b in badges" :key="b.name" :class="{ earned: b.earned }">
                <div class="badge-icon" v-html="b.icon"></div>
                <p class="badge-name">{{ b.name }}</p>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card__header"><h3>Research Interests</h3></div>
            <div class="interests-cloud">
              <span class="interest-tag" v-for="(tag, i) in interestTags" :key="tag"
                :style="{ fontSize: (0.75 + i * 0.05) + 'rem', opacity: 1 - i * 0.06 }">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

// ── State ──────────────────────────────────────────────────────────────────────
const sidebarCollapsed = ref(false)
const activeSection    = ref('overview')
const showNotifications= ref(false)
const searchQuery      = ref('')
const mentorTab        = ref('Find a Mentor')
const mentorFilter     = reactive({ field: '', country: '', mode: '' })
const repoFilter       = ref('')
const repoSearch       = ref('')
const forumCategory    = ref('')
const researchTagsInput= ref('Islamic Ethics, Political Economy, Education Reform')

// ── User ───────────────────────────────────────────────────────────────────────
const user = reactive({
  name: 'Aisha Kamara',
  role: 'Researcher / Postgraduate',
  bio: 'PhD candidate researching Islamic political economy and its applications in contemporary African governance.',
  location: 'Johannesburg, South Africa',
  institution: 'University of the Witwatersrand',
  availableForMentorship: true,
  completeness: 72,
})
const userInitials = computed(() => user.name.split(' ').map(n => n[0]).join(''))

// ── Nav ────────────────────────────────────────────────────────────────────────
const navItems = [
  { id: 'overview',   label: 'Overview',   subtitle: 'Your hub at a glance', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>` },
  { id: 'profile',    label: 'My Profile', subtitle: 'Manage your academic identity', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` },
  { id: 'analytics',  label: 'Analytics',  subtitle: 'Your impact and engagement',    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>` },
  { id: 'mentorship', label: 'Mentorship', subtitle: 'Connect, learn, and grow', badge: 2, icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
  { id: 'repository', label: 'Repository', subtitle: 'Curated Islamic knowledge resources', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>` },
  { id: 'community',  label: 'Community',  subtitle: 'Discussions and discourse', badge: 5, icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` },
]
const currentSection = computed(() => navItems.find(n => n.id === activeSection.value) || navItems[0])

// ── Notifications ──────────────────────────────────────────────────────────────
const notifications = ref([
  { id:1, message: 'Dr. Yusuf accepted your mentorship request', time: '2h ago', icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>` },
  { id:2, message: 'New discussion in Islamic Ethics forum', time: '5h ago', icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d3d3d" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` },
])

// ── Overview data ──────────────────────────────────────────────────────────────
const stats = [
  { label: 'Profile Views', value: '124', trend: 18, icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>` },
  { label: 'Connections', value: '12', trend: 4, icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
  { label: 'Sessions', value: '5', trend: 2, icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>` },
  { label: 'Resources Saved', value: '31', trend: -1, icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>` },
]

const recentActivity = [
  { id:1, type:'mentor', text:'Session with Dr. Fatima Jibril scheduled for Friday', time:'Today, 9:14 AM' },
  { id:2, type:'resource', text:'Saved "Maqasid al-Shariah in Modern Finance" to repository', time:'Yesterday' },
  { id:3, type:'community', text:'Replied to thread: Science and Islamic Epistemology', time:'2 days ago' },
  { id:4, type:'mentor', text:'Sent mentorship request to Prof. Omar Suleiman', time:'3 days ago' },
]

const quickActions = [
  { label:'Find a Mentor', target:'mentorship', icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
  { label:'Browse Repository', target:'repository', icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>` },
  { label:'Join Discussion', target:'community', icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` },
  { label:'Update Profile', target:'profile', icon:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>` },
]

const completenessItems = [
  { label: 'Basic info', done: true },
  { label: 'Profile photo', done: false },
  { label: 'Bio & research interests', done: true },
  { label: 'Publications added', done: true },
  { label: 'Mentorship preference set', done: false },
]

const suggestedScholars = [
  { name:'Dr. Fatima Jibril', initials:'FJ', field:'Islamic Law & Governance', location:'Lagos, Nigeria', tags:['Islamic Law','Public Policy'] },
  { name:'Prof. Rashid Hassan', initials:'RH', field:'Islamic Economics', location:'Cairo, Egypt', tags:['Economics','Finance'] },
  { name:'Dr. Zainab Osei', initials:'ZO', field:'Education & Pedagogy', location:'Accra, Ghana', tags:['Education','Curriculum'] },
]

// ── Profile ────────────────────────────────────────────────────────────────────
const publications = [
  { title:'Reconsidering Waqf as an Instrument of Social Finance', journal:'Journal of Islamic Economics', year:'2023', type:'article', url:'#' },
  { title:'Ubuntu and Islamic Ethics: A Comparative Study', journal:'African Philosophy Review', year:'2022', type:'article', url:'#' },
  { title:'The Maqasid Framework in Contemporary Governance', journal:'MSc Thesis — Wits', year:'2021', type:'thesis', url:'#' },
]

// ── Mentorship ─────────────────────────────────────────────────────────────────
const mentors = [
  { name:'Dr. Yusuf Al-Amin', initials:'YA', title:'Senior Lecturer, Islamic Studies', location:'Cape Town, SA', available:true, bio:'Specialises in contemporary fiqh and its applications to African Muslim communities.', tags:['Fiqh','Ethics','Governance'], mode:'Video Call' },
  { name:'Prof. Mariam Diallo', initials:'MD', title:'Professor of Islamic Economics', location:'Dakar, Senegal', available:true, bio:'20 years in Islamic finance and economic development in West Africa.', tags:['Finance','Development','Policy'], mode:'Email' },
  { name:'Dr. Khalid Okonkwo', initials:'KO', title:'Research Fellow, AI & Society', location:'Abuja, Nigeria', available:false, bio:'Exploring intersections of technology ethics and Islamic principles.', tags:['Technology','AI Ethics','Philosophy'], mode:'Video Call' },
  { name:'Ustadha Amira Tahir', initials:'AT', title:'Islamic Educator & Author', location:'Nairobi, Kenya', available:true, bio:'Curriculum developer focused on integrating Islamic pedagogy in modern schooling.', tags:['Education','Curriculum','Tarbiyah'], mode:'In-Person' },
]

const mentorshipTabs = ['Find a Mentor','My Sessions','Requests']

const sessions = [
  { id:1, mentor:'Dr. Yusuf Al-Amin', mentorInitials:'YA', topic:'Reviewing my PhD proposal chapter', date:'Fri, 4 Apr 2026 — 3:00 PM', status:'upcoming' },
  { id:2, mentor:'Prof. Mariam Diallo', mentorInitials:'MD', topic:'Career pathways in Islamic economics', date:'Mon, 17 Mar 2026 — 2:00 PM', status:'completed' },
]

const mentorRequests = [
  { id:1, from:'Bilal Nakayima', fromInitials:'BN', message:'I am a masters student in Islamic philosophy and would love guidance on my thesis direction.', time:'2h ago' },
]

// ── Repository ─────────────────────────────────────────────────────────────────
const resources = ref([
  { title:'Maqasid al-Shariah in Modern Finance', author:'Dr. M. Chapra', year:2023, type:'Article', excerpt:'A comprehensive analysis of how the higher objectives of Islamic law can frame contemporary financial systems.', tags:['Finance','Maqasid'], saved:false },
  { title:'African Muslim Thought: An Anthology', author:'Various Authors', year:2022, type:'Book Review', excerpt:'A curated collection of essays tracing intellectual traditions from the Sahel to East Africa.', tags:['History','African Islam'], saved:true },
  { title:'Decolonising Islamic Education in Africa', author:'Prof. A. Bangura', year:2023, type:'Research Paper', excerpt:'This paper argues for a reimagining of Islamic curricula that centres African epistemologies.', tags:['Education','Decolonisation'], saved:false },
  { title:'Technology and Islamic Ethics: A Framework', author:'Dr. K. Okonkwo', year:2024, type:'Article', excerpt:'Proposes an ethical framework for Muslim technologists navigating the digital economy.', tags:['Technology','Ethics'], saved:false },
])
const filteredResources = computed(() => resources.value.filter(r => {
  const matchType = !repoFilter.value || r.type === repoFilter.value
  const matchSearch = !repoSearch.value || r.title.toLowerCase().includes(repoSearch.value.toLowerCase())
  return matchType && matchSearch
}))

// ── Community ──────────────────────────────────────────────────────────────────
const forumCategories = ['Islamic Ethics','Economics & Finance','Science & Religion','Education','Governance','Technology']
const forumThreads = ref([
  { id:1, title:'How should Muslims engage with AI development?', excerpt:'As AI reshapes society, what responsibilities do Muslim technologists have and what does the tradition say?', author:'Bilal N.', time:'3h ago', replies:14, votes:28, tags:['Technology','Ethics'] },
  { id:2, title:'Reconciling evolutionary biology with creation in Islamic thought', excerpt:'A look at how contemporary Muslim scholars are navigating the science-religion conversation.', author:'Dr. Zainab O.', time:'1d ago', replies:22, votes:41, tags:['Science','Philosophy'] },
  { id:3, title:'Waqf as a tool for community development in post-apartheid SA', excerpt:'Can the waqf institution be revived to address socioeconomic disparities in South African Muslim communities?', author:'Aisha K.', time:'2d ago', replies:9, votes:19, tags:['Economics','Governance'] },
])

const topContributors = [
  { name:'Dr. Fatima J.', initials:'FJ', points:1240, badge:'🏆' },
  { name:'Prof. Rashid H.', initials:'RH', points:980, badge:'🥈' },
  { name:'Bilal N.', initials:'BN', points:740, badge:'🥉' },
]

// ── Analytics ──────────────────────────────────────────────────────────────────
const analyticsMetrics = [
  { label:'Profile Views', value:'124', sub:'↑ 18% this month' },
  { label:'Search Appearances', value:'67', sub:'↑ 4% this month' },
  { label:'Mentorship Reach', value:'8', sub:'scholars connected' },
  { label:'Content Engagement', value:'312', sub:'total interactions' },
]

const viewsData = [4,7,3,9,12,8,15,11,6,14,18,10,7,9,13,16,11,8,12,19,14,10,7,11,15,18,13,9,16,20]
const barLabels = viewsData.map((_, i) => i % 5 === 0 ? `D${i+1}` : '')

const badges = [
  { name:'Thought Leader', earned:false, icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
  { name:'Active Mentor', earned:true, icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
  { name:'Publisher', earned:true, icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>` },
  { name:'Community Pillar', earned:false, icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` },
  { name:'Connector', earned:false, icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>` },
  { name:'Research Star', earned:true, icon:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>` },
]

const interestTags = ['Islamic Ethics','Political Economy','African Islam','Governance','Maqasid','Waqf','Education','Philosophy','Decolonisation','Jurisprudence','Social Finance']

const logout = () => {
  localStorage.removeItem('kathrah_user')
  window.location.href = '/login'
}
</script>

<style scoped>
/* ── Root layout ─────────────────────────────────────────────────────────────── */
.dashboard-root {
  display: flex;
  min-height: 100vh;
  background: var(--off-white);
  font-family: var(--font-body);
}

/* ── Sidebar ─────────────────────────────────────────────────────────────────── */
.sidebar {
  width: 240px;
  min-height: 100vh;
  background: var(--teal-deep);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  transition: width 0.25s ease;
  z-index: 10;
}
.sidebar.collapsed { width: 64px; }

.sidebar__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1rem;
  border-bottom: 1px solid rgba(201,168,76,0.15);
}
.sidebar__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}
.logo-hex {
  font-size: 1.4rem;
  color: var(--gold);
  line-height: 1;
}
.logo-word {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--white);
  white-space: nowrap;
}
.logo-accent { color: var(--gold); }

.sidebar__toggle {
  background: none;
  border: none;
  color: rgba(255,255,255,0.5);
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  flex-shrink: 0;
}
.sidebar__toggle:hover { color: var(--white); }

.sidebar__nav {
  flex: 1;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-section-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.3);
  padding: 0.75rem 0.75rem 0.25rem;
  font-weight: 500;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 8px;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.15s, color 0.15s;
  position: relative;
  white-space: nowrap;
}
.nav-item:hover { background: rgba(255,255,255,0.06); color: var(--white); }
.nav-item.active { background: rgba(201,168,76,0.15); color: var(--gold-light); }
.nav-item.active .nav-item__icon { color: var(--gold); }
.nav-item__icon { flex-shrink: 0; color: inherit; display: flex; }
.nav-item__label { flex: 1; }
.nav-item__badge {
  background: var(--gold);
  color: var(--teal-deep);
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.sidebar__user {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1rem;
  border-top: 1px solid rgba(201,168,76,0.15);
}
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gold-dim);
  color: var(--white);
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.user-info { flex: 1; min-width: 0; }
.user-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-role {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.45);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-logout {
  background: none;
  border: none;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  padding: 4px;
  display: flex;
  flex-shrink: 0;
  transition: color 0.2s;
}
.user-logout:hover { color: var(--white); }

/* ── Main ────────────────────────────────────────────────────────────────────── */
.main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* ── Topbar ──────────────────────────────────────────────────────────────────── */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  background: var(--white);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 5;
}
.topbar__left {}
.topbar__title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-dark);
}
.topbar__sub {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 1px;
}
.topbar__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.topbar__search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--off-white);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.4rem 0.75rem;
  color: var(--text-muted);
}
.topbar__search input {
  border: none;
  background: none;
  outline: none;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-dark);
  width: 200px;
}
.topbar__notif {
  position: relative;
  background: none;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.4rem 0.5rem;
  color: var(--text-muted);
  display: flex;
  cursor: pointer;
  transition: background 0.15s;
}
.topbar__notif:hover { background: var(--off-white); }
.notif-dot {
  position: absolute;
  top: 6px; right: 6px;
  width: 7px; height: 7px;
  background: var(--gold);
  border-radius: 50%;
  border: 1.5px solid var(--white);
}

/* Notification panel */
.notif-panel {
  position: absolute;
  top: 70px; right: 2rem;
  width: 320px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-hover);
  z-index: 20;
  overflow: hidden;
}
.notif-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.85rem;
  font-weight: 600;
}
.notif-panel__header button {
  background: none;
  border: none;
  font-size: 0.75rem;
  color: var(--text-muted);
  cursor: pointer;
}
.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
}
.notif-icon { flex-shrink: 0; margin-top: 2px; }
.notif-msg { font-size: 0.82rem; color: var(--text-dark); line-height: 1.4; }
.notif-time { font-size: 0.72rem; color: var(--text-muted); margin-top: 2px; }
.notif-empty { padding: 1rem; text-align: center; font-size: 0.85rem; color: var(--text-muted); }

/* ── Content ─────────────────────────────────────────────────────────────────── */
.content {
  padding: 2rem;
  flex: 1;
}

/* ── Cards ───────────────────────────────────────────────────────────────────── */
.card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-card);
}
.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}
.card__header h3 {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-dark);
}
.card__link { font-size: 0.8rem; color: var(--gold-dim); text-decoration: none; }
.card__link:hover { color: var(--gold); }
.card__divider { height: 1px; background: var(--border); margin: 1.25rem 0; }

/* ── Buttons ─────────────────────────────────────────────────────────────────── */
.btn-teal {
  background: var(--teal-deep);
  color: var(--white);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-teal:hover { background: var(--teal-light); }

.btn-teal-sm {
  background: var(--teal-deep);
  color: var(--white);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-teal-sm:hover { background: var(--teal-light); }
.btn-teal-sm:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-gold {
  background: var(--gold-dim);
  color: var(--white);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.6rem 1.25rem;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-gold:hover { background: var(--gold); }

.btn-gold-sm {
  background: var(--gold-dim);
  color: var(--white);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-gold-sm:hover { background: var(--gold); }

.btn-ghost-sm {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.8rem;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: background 0.15s, color 0.15s;
}
.btn-ghost-sm:hover { background: var(--off-white); color: var(--text-dark); }

.btn-outline-sm {
  background: none;
  border: 1px solid var(--gold-dim);
  color: var(--gold-dim);
  font-size: 0.78rem;
  padding: 0.35rem 0.8rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.btn-outline-sm:hover { background: var(--gold-dim); color: var(--white); }

/* ── Tags ────────────────────────────────────────────────────────────────────── */
.tag {
  display: inline-block;
  background: rgba(10,46,46,0.06);
  color: var(--teal-deep);
  font-size: 0.72rem;
  font-weight: 500;
  padding: 0.2rem 0.55rem;
  border-radius: 20px;
}

/* ── Filter bar ──────────────────────────────────────────────────────────────── */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.filter-bar select, .filter-bar input[type=text] {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--white);
  padding: 0.45rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--text-dark);
  outline: none;
}
.filter-bar select:focus, .filter-bar input:focus {
  border-color: var(--teal-light);
}
.filter-bar input[type=text] { flex: 1; min-width: 180px; }

/* ── Tabs ────────────────────────────────────────────────────────────────────── */
.tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.5rem;
}
.tab {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.65rem 1.25rem;
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--text-muted);
  cursor: pointer;
  margin-bottom: -1px;
  transition: color 0.2s, border-color 0.2s;
}
.tab:hover { color: var(--text-dark); }
.tab.active { color: var(--teal-deep); border-bottom-color: var(--teal-deep); font-weight: 500; }

/* ── Toggle ──────────────────────────────────────────────────────────────────── */
.toggle-row { display: flex; align-items: center; gap: 0.6rem; font-size: 0.875rem; color: var(--text-muted); }
.toggle {
  width: 38px; height: 22px;
  background: var(--border);
  border: none;
  border-radius: 11px;
  cursor: pointer;
  position: relative;
  transition: background 0.2s;
  padding: 0;
}
.toggle.on { background: var(--teal-light); }
.toggle__knob {
  position: absolute;
  top: 3px; left: 3px;
  width: 16px; height: 16px;
  background: var(--white);
  border-radius: 50%;
  transition: transform 0.2s;
  display: block;
}
.toggle.on .toggle__knob { transform: translateX(16px); }

/* ── Overview ────────────────────────────────────────────────────────────────── */
.welcome-banner {
  background: linear-gradient(135deg, var(--teal-deep) 0%, var(--teal-mid) 100%);
  border-radius: var(--radius-lg);
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  overflow: hidden;
  position: relative;
}
.welcome-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='none' stroke='%23c9a84c' stroke-width='0.4' stroke-opacity='0.15'/%3E%3C/svg%3E");
  background-size: 60px 60px;
}
.welcome-banner__text { position: relative; z-index: 1; }
.welcome-eyebrow {
  font-family: var(--font-display);
  font-size: 0.9rem;
  color: var(--gold-light);
  letter-spacing: 0.05em;
  margin-bottom: 0.4rem;
}
.welcome-banner__text h2 {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--white);
  margin-bottom: 0.5rem;
}
.welcome-banner__text p {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.75);
  margin-bottom: 1.2rem;
}
.welcome-banner__text strong { color: var(--gold-light); }
.welcome-banner__art {
  position: relative;
  z-index: 1;
  width: 140px;
  opacity: 0.7;
  flex-shrink: 0;
}
.banner-hex-art { width: 100%; }

.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.stat-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow-card);
}
.stat-card__icon {
  width: 40px; height: 40px;
  background: var(--off-white);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--teal-deep);
  flex-shrink: 0;
}
.stat-card__body { flex: 1; }
.stat-card__value { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; color: var(--text-dark); }
.stat-card__label { font-size: 0.78rem; color: var(--text-muted); margin-top: 1px; }
.stat-card__trend { font-size: 0.75rem; font-weight: 600; padding: 0.2rem 0.45rem; border-radius: 20px; }
.stat-card__trend.up { background: #e8f5e9; color: #2e7d32; }
.stat-card__trend.down { background: #ffebee; color: #c62828; }

.overview-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.activity-list { display: flex; flex-direction: column; gap: 1rem; }
.activity-item { display: flex; align-items: flex-start; gap: 0.75rem; }
.activity-item__dot {
  width: 8px; height: 8px; border-radius: 50%; margin-top: 5px; flex-shrink: 0;
}
.activity-item__dot.mentor { background: var(--teal-light); }
.activity-item__dot.resource { background: var(--gold); }
.activity-item__dot.community { background: #7c6faa; }
.activity-item__text { font-size: 0.85rem; color: var(--text-dark); line-height: 1.4; }
.activity-item__time { font-size: 0.75rem; color: var(--text-muted); margin-top: 2px; }

.quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; }
.quick-action {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.75rem;
  background: var(--off-white);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  color: var(--text-dark);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  text-align: left;
}
.quick-action:hover { background: rgba(10,46,46,0.05); border-color: var(--teal-light); }
.quick-action__icon { color: var(--teal-deep); flex-shrink: 0; }

.completeness-list { display: flex; flex-direction: column; gap: 0.5rem; }
.completeness-item { display: flex; align-items: center; gap: 0.6rem; font-size: 0.82rem; color: var(--text-muted); }
.completeness-item__check {
  width: 16px; height: 16px; border-radius: 50%;
  border: 1.5px solid var(--border);
  flex-shrink: 0; display: flex; align-items: center; justify-content: center;
}
.completeness-item__check.done { background: var(--teal-deep); border-color: var(--teal-deep); }
.completeness-item span.done { color: var(--text-dark); text-decoration: line-through; opacity: 0.6; }

.scholars-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.scholar-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: box-shadow 0.2s;
}
.scholar-card:hover { box-shadow: var(--shadow-hover); }
.scholar-card__avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--teal-light); color: var(--white);
  font-size: 0.85rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 0.25rem;
}
.scholar-card__name { font-weight: 600; font-size: 0.9rem; color: var(--text-dark); }
.scholar-card__field { font-size: 0.78rem; color: var(--text-muted); }
.scholar-card__location { font-size: 0.75rem; color: var(--text-muted); }
.scholar-card__tags { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.25rem; }

/* ── Profile ─────────────────────────────────────────────────────────────────── */
.profile-layout { display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem; align-items: start; }
.profile-card { padding: 0; overflow: hidden; }
.profile-card__cover {
  height: 80px;
  background: linear-gradient(135deg, var(--teal-deep), var(--teal-mid));
  position: relative;
}
.profile-card__cover::after {
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0 L40 20 L20 40 L0 20 Z' fill='none' stroke='%23c9a84c' stroke-width='0.5' stroke-opacity='0.2'/%3E%3C/svg%3E");
  background-size: 40px 40px;
}
.profile-card__body { padding: 0 1.5rem 1.5rem; text-align: center; }
.profile-avatar-wrap {
  position: relative;
  display: inline-block;
  margin-top: -28px;
  margin-bottom: 0.75rem;
}
.profile-avatar {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: var(--gold-dim);
  color: var(--white);
  font-size: 1.2rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 3px solid var(--white);
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
}
.profile-avatar__edit {
  position: absolute; bottom: 0; right: 0;
  width: 20px; height: 20px;
  border-radius: 50%;
  background: var(--white);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  color: var(--text-muted);
}
.profile-name { font-family: var(--font-display); font-size: 1.1rem; font-weight: 600; }
.profile-role-badge {
  display: inline-block;
  background: rgba(10,46,46,0.08);
  color: var(--teal-deep);
  font-size: 0.72rem; font-weight: 500;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  margin: 0.3rem 0;
}
.profile-bio { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; margin: 0.5rem 0; }
.profile-meta { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.78rem; color: var(--text-muted); align-items: center; }
.profile-meta span { display: flex; align-items: center; gap: 0.35rem; }
.profile-stats {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid var(--border);
  margin-top: 1rem;
  padding-top: 1rem;
  text-align: center;
}
.profile-stats div strong { display: block; font-family: var(--font-display); font-size: 1.2rem; }
.profile-stats div span { font-size: 0.72rem; color: var(--text-muted); }

.profile-form-card {}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.form-field { display: flex; flex-direction: column; gap: 0.35rem; }
.form-field.full { grid-column: 1 / -1; }
.form-field label { font-size: 0.8rem; font-weight: 500; color: var(--text-dark); }
.form-field input, .form-field select, .form-field textarea {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 0.55rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--text-dark);
  background: var(--white);
  outline: none;
  transition: border-color 0.2s;
  resize: none;
}
.form-field input:focus, .form-field select:focus, .form-field textarea:focus {
  border-color: var(--teal-light);
}
.form-actions { display: flex; gap: 0.75rem; margin-top: 1.25rem; align-items: center; }

.pub-list { display: flex; flex-direction: column; gap: 0.75rem; }
.pub-item { display: flex; align-items: center; gap: 1rem; padding: 0.85rem; background: var(--off-white); border-radius: var(--radius-sm); }
.pub-item__type {
  font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
  padding: 0.2rem 0.5rem; border-radius: 4px; flex-shrink: 0;
}
.pub-item__type.article { background: rgba(10,46,46,0.1); color: var(--teal-deep); }
.pub-item__type.thesis { background: rgba(201,168,76,0.15); color: var(--gold-dim); }
.pub-item__body { flex: 1; }
.pub-item__title { font-size: 0.875rem; font-weight: 500; color: var(--text-dark); }
.pub-item__meta { font-size: 0.75rem; color: var(--text-muted); margin-top: 2px; }
.pub-item__link { font-size: 0.8rem; color: var(--gold-dim); white-space: nowrap; }

/* ── Mentorship ──────────────────────────────────────────────────────────────── */
.mentor-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
.mentor-card { display: flex; flex-direction: column; gap: 0.75rem; }
.mentor-card__top { display: flex; align-items: flex-start; gap: 0.75rem; }
.mentor-avatar {
  width: 42px; height: 42px; border-radius: 50%;
  background: var(--teal-mid); color: var(--white);
  font-size: 0.85rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.mentor-avatar.sm { width: 34px; height: 34px; font-size: 0.75rem; }
.mentor-name { font-weight: 600; font-size: 0.9rem; }
.mentor-title { font-size: 0.78rem; color: var(--text-muted); }
.mentor-loc { font-size: 0.75rem; color: var(--text-muted); }
.mentor-avail {
  margin-left: auto; font-size: 0.7rem; font-weight: 600;
  padding: 0.2rem 0.55rem; border-radius: 20px; flex-shrink: 0;
  background: #ffebee; color: #c62828;
}
.mentor-avail.available { background: #e8f5e9; color: #2e7d32; }
.mentor-bio { font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; flex: 1; }
.mentor-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.mentor-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.mentor-mode { font-size: 0.78rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.3rem; }

.sessions-list { display: flex; flex-direction: column; gap: 1rem; }
.session-item { display: flex; align-items: center; gap: 1rem; }
.session-item__status {
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
  padding: 0.25rem 0.6rem; border-radius: 20px; flex-shrink: 0;
}
.session-item__status.upcoming { background: rgba(10,46,46,0.1); color: var(--teal-deep); }
.session-item__status.completed { background: #e8f5e9; color: #2e7d32; }
.session-body { flex: 1; }
.session-mentor { font-weight: 600; font-size: 0.9rem; }
.session-topic { font-size: 0.82rem; color: var(--text-muted); }
.session-date { font-size: 0.78rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.3rem; margin-top: 2px; }
.session-actions { display: flex; gap: 0.5rem; }

.requests-list { display: flex; flex-direction: column; gap: 1rem; }
.request-item { display: flex; align-items: center; gap: 1rem; }
.request-body { flex: 1; }
.request-from { font-weight: 600; font-size: 0.875rem; }
.request-msg { font-size: 0.82rem; color: var(--text-muted); line-height: 1.4; margin-top: 2px; }
.request-time { font-size: 0.72rem; color: var(--text-muted); margin-top: 2px; }
.request-actions { display: flex; gap: 0.5rem; flex-shrink: 0; }

.empty-state { text-align: center; padding: 2rem; color: var(--text-muted); font-size: 0.875rem; }

/* ── Repository ──────────────────────────────────────────────────────────────── */
.repo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
.repo-card { display: flex; flex-direction: column; gap: 0.6rem; }
.repo-card__type {
  font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;
  display: inline-block; padding: 0.2rem 0.5rem; border-radius: 4px;
  align-self: flex-start;
}
.repo-card__type.article { background: rgba(10,46,46,0.1); color: var(--teal-deep); }
.repo-card__type.book-review { background: rgba(201,168,76,0.15); color: var(--gold-dim); }
.repo-card__type.research-paper { background: rgba(124,111,170,0.12); color: #5a4e8c; }
.repo-card__title { font-family: var(--font-display); font-size: 1rem; font-weight: 600; line-height: 1.3; }
.repo-card__author { font-size: 0.75rem; color: var(--text-muted); }
.repo-card__excerpt { font-size: 0.82rem; color: var(--text-muted); line-height: 1.55; flex: 1; }
.repo-card__tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.repo-card__footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }

/* ── Community ───────────────────────────────────────────────────────────────── */
.community-layout { display: grid; grid-template-columns: 1fr 280px; gap: 1.5rem; }
.forum-list { display: flex; flex-direction: column; gap: 1rem; }
.forum-thread { display: flex; align-items: flex-start; gap: 1rem; }
.thread-votes {
  display: flex; flex-direction: column; align-items: center; gap: 0.2rem;
  flex-shrink: 0;
}
.thread-votes button {
  background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.7rem;
  padding: 2px; line-height: 1;
}
.thread-votes span { font-size: 0.85rem; font-weight: 700; color: var(--text-dark); }
.thread-body { flex: 1; }
.thread-tags { display: flex; gap: 0.3rem; margin-bottom: 0.4rem; flex-wrap: wrap; }
.thread-title { font-family: var(--font-display); font-size: 1rem; font-weight: 600; margin-bottom: 0.3rem; }
.thread-excerpt { font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.5rem; }
.thread-meta { font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.4rem; }
.thread-author { font-weight: 500; color: var(--text-dark); }
.thread-reply { align-self: center; flex-shrink: 0; }

.contributor-list { display: flex; flex-direction: column; gap: 0.75rem; }
.contributor { display: flex; align-items: center; gap: 0.6rem; }
.contributor-avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--teal-light); color: var(--white);
  font-size: 0.72rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.contributor-name { font-size: 0.82rem; font-weight: 500; }
.contributor-pts { font-size: 0.72rem; color: var(--text-muted); }
.contributor-badge { margin-left: auto; font-size: 1rem; }

.cat-list { display: flex; flex-direction: column; gap: 0.35rem; }
.cat-item {
  font-size: 0.82rem; color: var(--text-muted); padding: 0.35rem 0.5rem;
  border-radius: var(--radius-sm); transition: background 0.15s, color 0.15s;
  cursor: pointer;
}
.cat-item:hover, .cat-item.active { background: rgba(10,46,46,0.06); color: var(--teal-deep); }

/* ── Analytics ───────────────────────────────────────────────────────────────── */
.analytics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.analytics-card { text-align: center; }
.analytics-label { font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.5rem; }
.analytics-value { font-family: var(--font-display); font-size: 2.5rem; font-weight: 600; color: var(--teal-deep); line-height: 1; }
.analytics-sub { font-size: 0.75rem; color: var(--text-muted); margin-top: 0.35rem; }

.bar-chart { padding: 0.5rem 0; }
.bar-chart__bars {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 120px;
}
.bar-wrap { display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; justify-content: flex-end; }
.bar {
  width: 100%;
  background: linear-gradient(to top, var(--teal-deep), var(--teal-light));
  border-radius: 3px 3px 0 0;
  min-height: 4px;
  transition: opacity 0.2s;
}
.bar:hover { opacity: 0.75; }
.bar-label { font-size: 0.6rem; color: var(--text-muted); margin-top: 4px; }

.analytics-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem; }

.badges-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.badge-item {
  display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
  padding: 1rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  text-align: center;
  opacity: 0.35;
  transition: opacity 0.2s;
}
.badge-item.earned { opacity: 1; }
.badge-item.earned .badge-icon { color: var(--gold); }
.badge-icon { color: var(--text-muted); }
.badge-name { font-size: 0.72rem; font-weight: 500; color: var(--text-dark); }

.interests-cloud { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: baseline; }
.interest-tag {
  display: inline-block;
  background: rgba(10,46,46,0.06);
  color: var(--teal-deep);
  font-weight: 500;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  transition: background 0.15s;
}
.interest-tag:hover { background: rgba(10,46,46,0.12); }

/* ── Transitions ─────────────────────────────────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s, transform 0.15s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }

/* ── Responsive ──────────────────────────────────────────────────────────────── */
@media (max-width: 1200px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .analytics-grid { grid-template-columns: repeat(2, 1fr); }
  .scholars-row { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 900px) {
  .sidebar { position: fixed; left: 0; top: 0; }
  .main { margin-left: 64px; }
  .sidebar:not(.collapsed) { width: 240px; box-shadow: 4px 0 20px rgba(0,0,0,0.15); }
  .overview-grid { grid-template-columns: 1fr; }
  .profile-layout { grid-template-columns: 1fr; }
  .community-layout { grid-template-columns: 1fr; }
  .analytics-row { grid-template-columns: 1fr; }
  .scholars-row { grid-template-columns: 1fr; }
}
@media (max-width: 600px) {
  .content { padding: 1rem; }
  .topbar { padding: 1rem; }
  .topbar__search input { width: 120px; }
  .stats-row { grid-template-columns: 1fr 1fr; }
  .welcome-banner__art { display: none; }
}
</style>