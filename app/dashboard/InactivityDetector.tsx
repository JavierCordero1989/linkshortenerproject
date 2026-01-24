'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface InactivityDetectorProps {
  /**
   * Tiempo de inactividad en milisegundos antes de cerrar sesión
   * @default 300000 (5 minutos)
   */
  timeout?: number;
  /**
   * Tiempo en milisegundos para mostrar advertencia antes del cierre
   * @default 30000 (30 segundos)
   */
  warningTime?: number;
}

export function InactivityDetector({
  timeout = 300000, // 5 minutos
  warningTime = 30000, // 30 segundos
}: InactivityDetectorProps) {
  const { signOut } = useAuth();
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // ref para que los event listeners lean el valor más reciente sin re-registrarlos
  const showWarningRef = useRef(showWarning);

  const clearAllTimers = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    if (warningTimeoutIdRef.current) {
      clearTimeout(warningTimeoutIdRef.current);
      warningTimeoutIdRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current as unknown as number);
      countdownIntervalRef.current = null;
    }
  };

  const handleLogout = async () => {
    console.log('InactivityDetector: handleLogout - signing out');

    clearAllTimers();
    setShowWarning(false);
    await signOut();
    router.push('/');
  };

  const startCountdown = () => {
    console.log('InactivityDetector: startCountdown');
    // limpiar interval previo si existe
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current as unknown as number);
      countdownIntervalRef.current = null;
    }

    setRemainingTime(Math.floor(warningTime / 1000));
    countdownIntervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current as unknown as number);
            countdownIntervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    console.log(`InactivityDetector: resetTimer() => timeout ${timeout}, warningTime ${warningTime}`);

    clearAllTimers();
    setShowWarning(false);
    showWarningRef.current = false;

    const warningDelay = Math.max(0, timeout - warningTime);

    // Si warningDelay es 0, mostrar inmediatamente la advertencia
    if (warningDelay === 0) {
      console.log('InactivityDetector: show warning immediately (warningDelay=0)');
      setShowWarning(true);
      showWarningRef.current = true;
      startCountdown();
    } else {
      // Temporizador para mostrar advertencia
      warningTimeoutIdRef.current = setTimeout(() => {
        console.log('InactivityDetector: show warning');
        setShowWarning(true);
        showWarningRef.current = true;
        startCountdown();
      }, warningDelay);
    }

    // Temporizador para cerrar sesión
    timeoutIdRef.current = setTimeout(() => {
      handleLogout();
    }, timeout);
  };

  const handleContinueSession = () => {
    setShowWarning(false);
    resetTimer();
  };

  useEffect(() => {
    console.log('InactivityDetector: mounted, timeout=', timeout, 'warningTime=', warningTime);

    // sincronizar ref con el estado para uso en handlers
    showWarningRef.current = showWarning;

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

    const handleActivity = () => {
      // usar el ref para leer el valor más reciente sin recrear listeners
      if (!showWarningRef.current) {
        resetTimer();
      }
    };

    // Iniciar temporizador al montar
    resetTimer();

    // Añadir event listeners (una sola vez)
    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    // Limpiar al desmontar
    return () => {
      clearAllTimers();
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  return (
    <AlertDialog open={showWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sesión por expirar</AlertDialogTitle>
          <AlertDialogDescription>
            Tu sesión expirará en {remainingTime} segundos debido a inactividad.
            ¿Deseas continuar con tu sesión?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleLogout}>
            Cerrar sesión
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleContinueSession}>
            Continuar sesión
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
