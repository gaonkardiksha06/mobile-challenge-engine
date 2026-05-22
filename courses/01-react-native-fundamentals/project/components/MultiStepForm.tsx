import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const STEPS = ['Personal', 'Contact', 'Review'];

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');

  const canGoNext = () => {
    if (step === 0) return name.trim().length > 0;
    if (step === 1) return email.trim().length > 0;
    return true;
  };

  return (
    <View style={styles.container} testID="multi-step-form">
      <View style={styles.indicator} testID="step-indicator">
        {STEPS.map((label, index) => (
          <View key={label} style={styles.stepItem}>
            <View style={[styles.dot, index <= step && styles.dotActive]}>
              <Text style={styles.dotText}>{index + 1}</Text>
            </View>
            <Text style={[styles.stepLabel, index === step && styles.stepLabelActive]}>{label}</Text>
          </View>
        ))}
      </View>

      {step === 0 && (
        <View testID="step-personal">
          <TextInput
            style={styles.input}
            placeholder="Full name"
            placeholderTextColor="#64748b"
            value={name}
            onChangeText={setName}
            testID="step-name"
          />
          <TextInput
            style={styles.input}
            placeholder="Short bio"
            placeholderTextColor="#64748b"
            value={bio}
            onChangeText={setBio}
            testID="step-bio"
          />
        </View>
      )}

      {step === 1 && (
        <View testID="step-contact">
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#64748b"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            testID="step-email"
          />
        </View>
      )}

      {step === 2 && (
        <View style={styles.review} testID="step-review">
          <Text style={styles.reviewText}>Name: {name || '—'}</Text>
          <Text style={styles.reviewText}>Bio: {bio || '—'}</Text>
          <Text style={styles.reviewText}>Email: {email || '—'}</Text>
        </View>
      )}

      <View style={styles.nav}>
        <Pressable
          style={[styles.navButton, step === 0 && styles.navDisabled]}
          disabled={step === 0}
          onPress={() => setStep((s) => Math.max(0, s - 1))}
          testID="previous-button"
        >
          <Text style={styles.navText}>Previous</Text>
        </Pressable>
        {step < STEPS.length - 1 ? (
          <Pressable
            style={[styles.navButton, styles.navPrimary, !canGoNext() && styles.navDisabled]}
            disabled={!canGoNext()}
            onPress={() => setStep((s) => s + 1)}
            testID="next-button"
          >
            <Text style={[styles.navText, styles.navPrimaryText]}>Next</Text>
          </Pressable>
        ) : (
          <Pressable style={[styles.navButton, styles.navPrimary]} testID="submit-button">
            <Text style={[styles.navText, styles.navPrimaryText]}>Submit</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', padding: 16 },
  indicator: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  stepItem: { alignItems: 'center', flex: 1 },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  dotActive: { backgroundColor: '#38bdf8' },
  dotText: { color: '#0f172a', fontWeight: '700', fontSize: 14 },
  stepLabel: { fontSize: 12, color: '#64748b' },
  stepLabelActive: { color: '#38bdf8', fontWeight: '600' },
  input: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#f8fafc',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  review: { padding: 12, backgroundColor: '#1e293b', borderRadius: 12 },
  reviewText: { color: '#f8fafc', fontSize: 16, marginBottom: 8 },
  nav: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, gap: 12 },
  navButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#334155',
    alignItems: 'center',
  },
  navPrimary: { backgroundColor: '#38bdf8' },
  navDisabled: { opacity: 0.4 },
  navText: { color: '#f8fafc', fontWeight: '600' },
  navPrimaryText: { color: '#0f172a' },
});
