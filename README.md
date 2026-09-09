# Paws in the Park Flow

This has been made for a brief UXT2305, it has been made for educational purposes and is in no way affiliated with AACL.

Desktop Wireframes: Screen-by-Screen UI Breakdown

This document provides a detailed description of the layout, content, and color usage for the 7-step desktop user flow for the AACL "Paws in the Park" registration process.

Screen 1: Main AACL Homepage (Global Region Selector)

Header Bar: Features a white background with a light slate border (#CBD5E1). The AACL logo placeholder sits on the left. The navigation links are simple gray blocks. On the far right is the region selector button reading "📍 Region: Cape Town ▼", styled with a Primary Green border and text (#007E46).

Hero Section: A large 16:9 banner area with a light gray background (#E2E8F0). It contains a central title and subtitle block (dark slate gray, #475569).

Call to Action: A bold primary button reading "View Cape Town Events" using the Primary Brand Green (#007E46) with white text.

Screen 2: Cape Town Regional Events Hub (Desktop Grid)

Facility Toggles: Located below the header on a very light gray-blue background (#F8FAFC). It features three toggle buttons: "All Cape Town", "Epping Shelter", and "Bellville Clinic". The active toggle ("All Cape Town") is filled with Dark Green (#004D40) with white text.

Featured Event (Hero Card): A large rectangular card with a white background and slate border. The left side is an image placeholder (#E2E8F0). The right side features the title "PAWS IN THE PARK 2026" in Dark Green (#004D40), a subtitle "Jack Muller District Park, Bellville" in slate gray (#475569), and a Primary Green (#007E46) button reading "Register & Match with a Dog".

Secondary Grid: Three smaller event cards sit side-by-side below the hero card, using the light gray-blue background (#F8FAFC).

Screen 3: User Registration & Preferences

Layout: A 50/50 split-screen layout designed for desktop.

Left Column (Preferences): Sits on a light gray-blue background (#F8FAFC). The main title "Tell us about yourself" is Dark Green (#004D40). Below it is a white box containing Pace Preferences. The user can select "Casual Walker" or "Avid Jogger". The active selection is highlighted in Dark Green (#004D40).

Right Column (Data Input): Features a clean white background. It contains three form fields: Full Name, Email Address, and Cell Number, with light slate borders (#CBD5E1). At the bottom is a centered Primary Green button (#007E46) reading "Save & Start Swiping".

Screen 4: Paws Match Swiper (Interactive Engine)

Progress Indicator: At the top, a step-indicator shows four dots. The active steps are Primary Green (#007E46).

Header Text: The title "Who do you want to walk with?" is displayed prominently in Dark Green (#004D40) on a light gray-blue background (#F8FAFC).

Tinder-Style Swiper Area:

Action Buttons: A left "Pass" button with a red cross (#E53E3E) and a right "Match" button with a Primary Green heart (#007E46).

Dog Card: A central white card with a subtle drop shadow. The top 60% is an image placeholder (#E2E8F0). The bottom 40% contains the dog's details: "Buster, 2 yrs" and "Collie Cross - High Energy" in slate gray (#475569).

Trait Chips: Small pill-shaped tags reading "Loves Jogging" and "Good with Kids". These have a soft Light Mint background (#E6F4F1) and Dark Green text (#004D40).

Screen 5: Pending Team Review & Processing

Layout: A centered, focused status box on a white background with a slate border (#CBD5E1), sitting over the light gray-blue page background (#F8FAFC).

Visuals: A large circular loading spinner sits at the top, accented with a Primary Green top-border line (#007E46).

Content: The title "Reviewing your matches..." is in Dark Green (#004D40). The explanatory text below is slate gray (#475569), explaining that the behavior team is reviewing the profile. A muted gray button allows the user to "Return to Homepage".

Screen 6: Email Notification (Webmail Client)

Interface Concept: This screen simulates an external email inbox to show the off-platform notification step. The header is a darker gray (#E2E8F0) reading "Webmail Client".

Left Sidebar (Inbox): Shows a list of emails. The top email is "Unread", highlighted with a solid Primary Green left-border (#007E46). The sender reads "AACL Cape Town" in Dark Green (#004D40).

Right Window (Email Body): A white background containing the email content. It features the AACL logo placeholder, a Dark Green title "Great news, Sarah!", and slate gray text confirming the match. A Primary Green (#007E46) button prompts the user to "View Your Match & Ticket".

Screen 7: Final Buddy Confirmation & Ticket

Header: The top navigation bar updates to show a bold "Match Confirmed!" message in Primary Green (#007E46).

Page Content: Sits on a light gray-blue background (#F8FAFC). The celebratory title "It's Official! You're walking with Buster." is Dark Green (#004D40).

Ticket Card: A unique white container with a dashed Primary Green border (#007E46) to mimic a tear-away ticket. It contains:

A square thumbnail image placeholder for Buster (#E2E8F0).

Event details in slate gray (#475569): "Date: Saturday, 24th Nov", "Pace: Avid Jogger (5km)", and "Handler: Sarah Jenkins".

A square QR Code placeholder on the right side (#E2E8F0).

Final Action: A Primary Green button (#007E46) at the bottom reading "Download Ticket / Add to Wallet".

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f923ea17-5238-4492-b62b-929fc60d0093).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
