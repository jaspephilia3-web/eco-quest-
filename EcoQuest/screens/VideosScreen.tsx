import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { sx } from '../styles/sx';
import { C } from '../constants/colors';
import { VIDEOS } from '../constants/data';
import Card from '../components/Card';
import Tag from '../components/Tag';

export default function VideosScreen() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <ScrollView
      style={sx.screen}
      contentContainerStyle={sx.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={sx.pageHero}>
        <Text style={sx.pageHeroTitle}>▶️ Watch & Learn</Text>
        <Text style={sx.pageHeroSub}>
          Powerful stories about our planet and the people working to protect it.
        </Text>
      </View>

      {VIDEOS.map((v) => (
        <Card key={v.id} style={{ marginBottom: 18, overflow: 'hidden', padding: 0 }}>
          {/* Thumbnail */}
          <TouchableOpacity
            style={sx.videoThumb}
            onPress={() => setPlaying(playing === v.id ? null : v.id)}
            activeOpacity={0.9}
          >
            <Text style={sx.videoEmoji}>{v.emoji}</Text>
            <View style={sx.playBtn}>
              <Text style={sx.playIcon}>{playing === v.id ? '⏸' : '▶'}</Text>
            </View>
            <View style={sx.durationPill}>
              <Text style={sx.durationText}>{v.duration}</Text>
            </View>
          </TouchableOpacity>

          {/* Info */}
          <View style={{ padding: 16 }}>
            <Text style={sx.videoTitle}>{v.title}</Text>
            <Text style={sx.videoChannel}>{v.channel}</Text>
            <Text style={sx.videoDesc}>{v.description}</Text>
            <View style={sx.tagsRow}>
              {v.tags.map((t) => <Tag key={t} label={t} color={C.emerald} />)}
            </View>
          </View>

          {/* Player mock */}
          {playing === v.id && (
            <View style={sx.playerMock}>
              <Text style={sx.playerEmoji}>🎬</Text>
              <Text style={sx.playerTitle}>Now Playing</Text>
              <Text style={sx.playerSub}>{v.title}</Text>
              <Text style={sx.playerNote}>
                Integrate expo-av or a WebView YouTube embed to play real video content.
              </Text>
              <TouchableOpacity style={sx.playerClose} onPress={() => setPlaying(null)}>
                <Text style={sx.playerCloseText}>✕  Close Player</Text>
              </TouchableOpacity>
            </View>
          )}
        </Card>
      ))}

      <View style={{ height: 28 }} />
    </ScrollView>
  );
}
