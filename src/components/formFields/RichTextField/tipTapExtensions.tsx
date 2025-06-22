import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import Gapcursor from "@tiptap/extension-gapcursor";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import YouTube from "@tiptap/extension-youtube";

export const tipTapExtensions = [
  Blockquote,
  Bold,
  BulletList,
  Document,
  Gapcursor,
  HardBreak,
  Heading.configure({
    levels: [3],
  }),
  History,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Paragraph,
  Strike,
  Text,
  Underline,
  YouTube.configure({
    width: 300,
    height: 200,
    nocookie: true,
    modestBranding: true,
  }),
];
