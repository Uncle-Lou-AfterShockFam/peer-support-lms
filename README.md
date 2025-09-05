# 🎓 Peer Support LMS - Safe Peer Portal

A professional Learning Management System built with Next.js and Baserow, designed specifically for Peer Support Specialist training programs.

## 🌟 Features

- **📚 Course Management**: Rich course catalog with detailed information
- **👥 User Management**: Student, instructor, and admin roles  
- **❓ Quiz System**: Comprehensive quiz management with multiple question types
- **📊 Progress Tracking**: Detailed analytics and progress monitoring
- **🏆 Certification**: Achievement tracking and certificate generation
- **📱 Responsive Design**: Works perfectly on all devices
- **🚀 Fast Performance**: Built with Next.js and optimized for speed

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Baserow (headless database)
- **Deployment**: Vercel
- **UI Components**: Framer Motion, Lucide React
- **Styling**: Tailwind CSS with custom components

## 🚀 Quick Deploy to Vercel

### 1. Fork or Download This Project

### 2. Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/peer-support-lms)

### 3. Configure Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

```bash
BASEROW_API_URL=http://YOUR_BASEROW_SERVER_IP/api
BASEROW_TOKEN=your_baserow_token
NEXT_PUBLIC_SITE_URL=https://safepeerportal.soberafe.com
NEXT_PUBLIC_API_URL=https://safepeerportal.soberafe.com/api
```

### 4. Add Custom Domain

1. Go to Vercel project → Settings → Domains
2. Add `safepeerportal.soberafe.com`
3. Configure DNS in Namecheap:
   - Type: `A`
   - Host: `safepeerportal`
   - Value: `[Vercel's IP address from dashboard]`

## 🏗️ Local Development

### Prerequisites
- Node.js 18+ 
- Your Baserow server running (localhost or remote)

### Setup
```bash
# Clone the repository
git clone [repository-url]
cd peer-support-lms

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Baserow API URL and token

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see your LMS.

## 📊 Baserow Integration

This LMS connects to your existing Baserow database with these tables:
- **Users** (ID: 2224) - User profiles and authentication
- **Courses** (ID: 2225) - Course information and metadata  
- **Quizzes** (ID: 2226) - Quiz definitions
- **Enrollments** (ID: 2227) - Student course enrollments
- **Quiz Attempts** (ID: 2228) - Quiz attempt records
- **Quiz Questions** (ID: 2237) - Quiz question bank
- **Question Choices** (ID: 2238) - Multiple choice options
- **Course Lessons** (ID: 2239) - Lesson content and structure
- **User Progress** (ID: 2240) - Detailed progress tracking

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme colors
- Update `app/globals.css` for custom styles
- Edit components in `/components` folder

### Branding
- Update logo and branding in `components/Header.tsx`
- Modify site metadata in `app/layout.tsx`
- Customize footer in `components/Footer.tsx`

## 🌐 Production Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Alternative Deployment Options
- **Netlify**: Similar to Vercel with static site generation
- **AWS Amplify**: Full-stack deployment with AWS services
- **Digital Ocean App Platform**: Container-based deployment

## 🔧 Configuration Options

### Environment Variables
- `BASEROW_API_URL`: Your Baserow API endpoint
- `BASEROW_TOKEN`: Authentication token for Baserow
- `NEXT_PUBLIC_SITE_URL`: Your production site URL
- `NEXT_PUBLIC_API_URL`: Your API endpoint URL

### Performance Optimization
- Image optimization through Next.js Image component
- Automatic code splitting
- Server-side rendering for SEO
- Static generation where possible

## 📈 Analytics & Monitoring

- Built-in course completion tracking
- User progress analytics
- Quiz performance metrics
- Enrollment statistics

## 🔒 Security

- Environment variable protection
- API route protection
- Input sanitization
- CORS configuration

## 🆘 Support

### Common Issues
1. **API Connection Failed**: Check BASEROW_API_URL and token
2. **Build Errors**: Ensure all dependencies are installed
3. **Styling Issues**: Verify Tailwind CSS configuration

### Getting Help
- Check the Baserow API documentation
- Review Next.js documentation for framework issues
- Check Vercel deployment logs for production issues

## 🎯 Roadmap

- [ ] Real-time chat integration
- [ ] Video streaming capabilities  
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Integration with external LMS platforms

## 📄 License

MIT License - feel free to use this project for your educational initiatives.

---

Built with ❤️ for the peer support community by Louis Piotti.