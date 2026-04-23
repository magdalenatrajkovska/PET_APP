// pet-forum.component.ts
import {
  Component,
  OnInit,
  signal,
  computed,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PetForumService } from './pet-forum.service';
import { PetPost, HelpPost, User } from './pet-forum.models';

type Tab = 'feed' | 'help';
type Modal = 'none' | 'post' | 'question';

@Component({
  selector: 'app-pet-forum',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './pet-forum.component.html',
  styleUrls: ['./pet-forum.component.css'],
  providers: [PetForumService]
})
export class PetForumComponent implements OnInit {
  private service = inject(PetForumService);

  // ─── Current user (simulated) ────────────────────────────────────────────
  currentUser: User = {
    id: 1,
    username: 'pawrent_maya',
    displayName: 'Maya Kostadinova',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=maya',
    location: 'Skopje'
  };

  // ─── State ────────────────────────────────────────────────────────────────
  activeTab = signal<Tab>('feed');
  openModal = signal<Modal>('none');
  posts = signal<PetPost[]>([]);
  questions = signal<HelpPost[]>([]);
  isLoading = signal(false);
  likedPosts = signal<Set<number>>(new Set());

  // ─── New Post Form ────────────────────────────────────────────────────────
  newPost = {
    petName: '',
    description: '',
    image: ''
  };

  // ─── New Question Form ────────────────────────────────────────────────────
  newQuestion = {
    title: '',
    description: '',
    image: ''
  };

  // ─── Lifecycle ────────────────────────────────────────────────────────────
  ngOnInit(): void {
    this.loadPosts();
    this.loadQuestions();
  }

  // ─── Data Loading ─────────────────────────────────────────────────────────
  loadPosts(): void {
    this.isLoading.set(true);
    this.service.getPosts(this.currentUser.location).subscribe({
      next: (data) => {
        this.posts.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        // Fall back to demo data if JSON Server isn't running
        this.posts.set(this.getDemoPosts());
        this.isLoading.set(false);
      }
    });
  }

  loadQuestions(): void {
    this.service.getQuestions(this.currentUser.location).subscribe({
      next: (data) => this.questions.set(data),
      error: () => this.questions.set(this.getDemoQuestions())
    });
  }

  // ─── Tab Switching ────────────────────────────────────────────────────────
  switchTab(tab: Tab): void {
    this.activeTab.set(tab);
  }

  // ─── Like Toggle ──────────────────────────────────────────────────────────
  toggleLike(post: PetPost): void {
    const liked = new Set(this.likedPosts());
    const id = post.id!;
    if (liked.has(id)) {
      liked.delete(id);
      post.likes--;
    } else {
      liked.add(id);
      post.likes++;
    }
    this.likedPosts.set(liked);
    // Trigger change detection
    this.posts.update(p => [...p]);
  }

  isLiked(postId: number): boolean {
    return this.likedPosts().has(postId);
  }

  // ─── Modal Controls ───────────────────────────────────────────────────────
  openCreatePost(): void {
    this.newPost = { petName: '', description: '', image: '' };
    this.openModal.set('post');
  }

  openCreateQuestion(): void {
    this.newQuestion = { title: '', description: '', image: '' };
    this.openModal.set('question');
  }

  closeModal(): void {
    this.openModal.set('none');
  }

  // ─── Submit Handlers ──────────────────────────────────────────────────────
  submitPost(): void {
    if (!this.newPost.petName.trim() || !this.newPost.description.trim()) return;

    const post: Omit<PetPost, 'id'> = {
      userId: this.currentUser.id,
      username: this.currentUser.username,
      displayName: this.currentUser.displayName,
      avatar: this.currentUser.avatar,
      petName: this.newPost.petName,
      description: this.newPost.description,
      image: this.newPost.image || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&h=600&fit=crop',
      location: this.currentUser.location,
      likes: 0,
      commentCount: 0,
      createdAt: new Date().toISOString()
    };

    this.service.createPost(post).subscribe({
      next: (created) => {
        this.posts.update(p => [created, ...p]);
        this.closeModal();
      },
      error: () => {
        // Optimistic update if server is offline
        this.posts.update(p => [{ ...post, id: Date.now() }, ...p]);
        this.closeModal();
      }
    });
  }

  submitQuestion(): void {
    if (!this.newQuestion.title.trim() || !this.newQuestion.description.trim()) return;

    const question: Omit<HelpPost, 'id'> = {
      userId: this.currentUser.id,
      username: this.currentUser.username,
      displayName: this.currentUser.displayName,
      avatar: this.currentUser.avatar,
      title: this.newQuestion.title,
      description: this.newQuestion.description,
      image: this.newQuestion.image || null,
      location: this.currentUser.location,
      answerCount: 0,
      createdAt: new Date().toISOString()
    };

    this.service.createQuestion(question).subscribe({
      next: (created) => {
        this.questions.update(q => [created, ...q]);
        this.closeModal();
      },
      error: () => {
        this.questions.update(q => [{ ...question, id: Date.now() }, ...q]);
        this.closeModal();
      }
    });
  }

  // ─── Utilities ────────────────────────────────────────────────────────────
  timeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }

  trackById(_: number, item: PetPost | HelpPost): number {
    return item.id!;
  }

  // ─── Demo Data (fallback when JSON Server is offline) ────────────────────
  private getDemoPosts(): PetPost[] {
    return [
      {
        id: 1,
        userId: 1,
        username: 'pawrent_maya',
        displayName: 'Maya Kostadinova',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=maya',
        petName: 'Biscuit',
        description: 'Biscuit had his first bath today and he was NOT happy about it 😂 Still the goodest boy though!',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop',
        location: 'Skopje',
        likes: 24,
        commentCount: 6,
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 2,
        userId: 2,
        username: 'dogdad_stefan',
        displayName: 'Stefan Ivanovski',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=stefan',
        petName: 'Luna',
        description: 'Morning walk at Gradski Park with Luna ☀️ She found three squirrels and absolutely lost it every single time.',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop',
        location: 'Skopje',
        likes: 41,
        commentCount: 12,
        createdAt: new Date(Date.now() - 7200000).toISOString()
      },
      {
        id: 3,
        userId: 1,
        username: 'pawrent_maya',
        displayName: 'Maya Kostadinova',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=maya',
        petName: 'Biscuit',
        description: 'Adoption anniversary! 🎉 One year ago today I brought this little gremlin home from the shelter. Best decision of my life.',
        image: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600&h=600&fit=crop',
        location: 'Skopje',
        likes: 89,
        commentCount: 23,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
  }

  private getDemoQuestions(): HelpPost[] {
    return [
      {
        id: 1,
        userId: 2,
        username: 'dogdad_stefan',
        displayName: 'Stefan Ivanovski',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=stefan',
        title: 'Best vet for large breeds in Skopje?',
        description: 'Luna needs her annual checkup. Looking for a vet who has experience with large breeds and is patient with anxious dogs.',
        image: null,
        location: 'Skopje',
        answerCount: 4,
        createdAt: new Date(Date.now() - 5400000).toISOString()
      },
      {
        id: 2,
        userId: 1,
        username: 'pawrent_maya',
        displayName: 'Maya Kostadinova',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=maya',
        title: 'My dog keeps eating grass — is this normal?',
        description: 'Biscuit has been eating grass almost every day during walks. He doesn\'t seem sick afterward but I\'m a bit worried.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        location: 'Skopje',
        answerCount: 7,
        createdAt: new Date(Date.now() - 108000000).toISOString()
      }
    ];
  }
}
